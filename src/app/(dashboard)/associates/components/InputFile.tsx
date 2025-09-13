import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { IconCamera, IconPencilMinus } from "@tabler/icons-react";

export function InputFile() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex items-center justify-center gap-3 rounded-full h-[96px] w-[96px] bg-gray-100 border-2 border-dashed hover:bg-gray-200 hover:border-blue-500 transition-all">
      <div className="relative w-full h-full cursor-pointer">
        <Input
          id="picture"
          type="file"
          className="opacity-0 w-full h-full cursor-pointer z-10"
          accept="image/*"
          onChange={handleFileChange} 
        />
        
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
        ) : (
          <IconCamera className="absolute inset-0 m-auto text-gray-500 cursor-pointer" size={24} />
        )}
      </div>
      
      <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer">
        <IconPencilMinus className=" text-white rounded-full cursor-pointer" size={20} />
      </div>
    </div>
  );
}
