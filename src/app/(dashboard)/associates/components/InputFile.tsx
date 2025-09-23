import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { IconCamera, IconPencilMinus, IconX } from "@tabler/icons-react";

interface InputFileProps {
  onFileSelect?: (file: File | null) => void;
  initialImage?: string | null; // <- imagem vinda da API
}

export function InputFile({ onFileSelect, initialImage }: InputFileProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  // quando receber a imagem inicial, já mostra no preview
  useEffect(() => {
    if (initialImage) {
      setImagePreview(initialImage);
    }
  }, [initialImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileType(file.type);
      onFileSelect?.(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFileType(null);
    onFileSelect?.(null);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-2">
      <div className="relative flex items-center justify-center rounded-full h-[96px] w-[96px] bg-gray-100 border-2 border-dashed hover:bg-gray-200 hover:border-blue-500 transition-all cursor-pointer">
        <div className="relative w-full h-full">
          <Input
            id="picture"
            type="file"
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
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
            <IconCamera className="absolute inset-0 m-auto text-gray-500" size={24} />
          )}
        </div>

        <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer">
          <IconPencilMinus className="text-white rounded-full cursor-pointer" size={20} />
        </div>

        {imagePreview && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition cursor-pointer"
          >
            <IconX size={16} />
          </button>
        )}
      </div>

      {fileType && (
        <span className="text-xs text-gray-500 mt-1">
          Tipo: {fileType}
        </span>
      )}
    </div>
  );
}
