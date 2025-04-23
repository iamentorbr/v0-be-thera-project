"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileText, FileAudio, FileImage, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

interface FileUploadProps {
  onUploadComplete: (file: UploadedFile) => void
  acceptedFileTypes?: string
  maxSizeMB?: number
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadDate: Date
}

export function FileUpload({ onUploadComplete, acceptedFileTypes = "*", maxSizeMB = 10 }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const validateFile = (file: File): boolean => {
    // Verificar tamanho do arquivo
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: `O tamanho máximo permitido é ${maxSizeMB}MB.`,
        variant: "destructive",
      })
      return false
    }

    // Verificar tipo de arquivo se especificado
    if (acceptedFileTypes !== "*") {
      const fileType = file.type
      const acceptedTypes = acceptedFileTypes.split(",").map((type) => type.trim())

      if (!acceptedTypes.some((type) => fileType.includes(type) || type === "*")) {
        toast({
          title: "Tipo de arquivo não suportado",
          description: `Por favor, envie apenas arquivos do tipo ${acceptedFileTypes}.`,
          variant: "destructive",
        })
        return false
      }
    }

    return true
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        setSelectedFile(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        setSelectedFile(file)
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulação de upload com progresso
    const totalSteps = 10
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setUploadProgress((i / totalSteps) * 100)
    }

    // Simulação de resposta do servidor
    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substring(2, 11),
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      url: URL.createObjectURL(selectedFile), // Na implementação real, seria a URL do servidor
      uploadDate: new Date(),
    }

    // Notificar o componente pai sobre o upload concluído
    onUploadComplete(uploadedFile)

    // Resetar o estado
    setIsUploading(false)
    setSelectedFile(null)
    setUploadProgress(0)

    toast({
      title: "Upload concluído",
      description: `O arquivo ${selectedFile.name} foi enviado com sucesso.`,
    })
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setIsUploading(false)
    setUploadProgress(0)
  }

  const getFileIcon = (file: File) => {
    const type = file.type
    if (type.includes("audio")) return <FileAudio className="h-8 w-8 text-primary" />
    if (type.includes("pdf")) return <FileText className="h-8 w-8 text-primary" />
    if (type.includes("image")) return <FileImage className="h-8 w-8 text-primary" />
    return <File className="h-8 w-8 text-primary" />
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-4">
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-1">Arraste e solte seu arquivo aqui</p>
          <p className="text-xs text-muted-foreground mb-4">
            Suporta arquivos de áudio, PDFs e documentos de texto (máx. {maxSizeMB}MB)
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="relative overflow-hidden"
          >
            Selecionar Arquivo
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={acceptedFileTypes}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center space-x-4">
            {getFileIcon(selectedFile)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCancel} disabled={isUploading}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {isUploading && (
            <div className="mt-4 space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">{Math.round(uploadProgress)}%</p>
            </div>
          )}

          {!isUploading && (
            <div className="mt-4 flex justify-end">
              <Button onClick={handleUpload}>Enviar Arquivo</Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
