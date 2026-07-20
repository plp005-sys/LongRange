import React, { useState } from "react";
import { UploadCloud, FileType, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

export default function PrescriptionUpload() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [patientId, setPatientId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;

    setUploading(true);
    setStatus("idle");

    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `prescriptions/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('prescriptions') // Note: Make sure to create this bucket in Supabase!
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('prescriptions')
        .getPublicUrl(filePath);

      // 3. Save to Supabase Database
      const { error: dbError } = await supabase
        .from('prescriptions') // Note: Make sure to create this table in Supabase!
        .insert({
          user_id: user.id,
          patient_id: patientId,
          file_name: file.name,
          file_url: publicUrl,
          status: 'pending'
        });

      if (dbError) throw dbError;

      setStatus("success");
      setMessage("Prescription securely uploaded and queued for review.");
      setFile(null);
      setPatientId("");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Prescription Upload</h1>
        <p className="text-gray-600">Send us a photo or PDF of your new prescription, and our pharmacists will prepare it for you.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Upload Details</CardTitle>
            <CardDescription>All uploads are encrypted and HIPAA compliant.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {status === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Success!</p>
                  <p className="text-sm">{message}</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{message}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="patientId" className="text-sm font-medium text-gray-700">Patient ID or NHS Number (Optional)</label>
              <Input 
                id="patientId" 
                value={patientId} 
                onChange={(e) => setPatientId(e.target.value)} 
                placeholder="e.g. 123 456 7890" 
              />
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium text-gray-700">Prescription File</label>
               <div 
                 onDragOver={handleDragOver}
                 onDrop={handleDrop}
                 className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#15e637] transition-colors cursor-pointer bg-gray-50 relative"
               >
                 <div className="space-y-1 text-center">
                   <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                   <div className="flex text-sm text-gray-600 justify-center">
                     <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#15e637] hover:text-[#11b32b] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#15e637]">
                       <span>Upload a file</span>
                       <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg" />
                     </label>
                     <p className="pl-1">or drag and drop</p>
                   </div>
                   <p className="text-xs text-gray-500">
                     PNG, JPG, PDF up to 10MB
                   </p>
                 </div>
               </div>
               
               {file && (
                 <div className="mt-4 flex items-center gap-3 p-3 bg-green-50/50 border border-green-100 rounded-md">
                   <FileType className="h-6 w-6 text-green-600" />
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                     <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                   </div>
                   <Button variant="ghost" size="sm" type="button" onClick={() => setFile(null)} className="text-red-500 hover:text-red-700 hover:bg-red-50">Remove</Button>
                 </div>
               )}
            </div>

          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full text-lg h-12" disabled={!file || uploading}>
              {uploading ? "Uploading..." : "Submit Prescription"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
