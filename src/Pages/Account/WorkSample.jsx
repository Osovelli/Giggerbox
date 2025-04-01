import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, File, Pencil, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import CustomButton from "@/components/CustomButton"

function WorkSamples() {
  const [files, setFiles] = useState([
    { id: 1, name: "Document name", size: "300KB" },
    { id: 2, name: "Document name", size: "300KB" },
    { id: 3, name: "Document name", size: "300KB" },
  ])
  const [referenceLink, setReferenceLink] = useState("")
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [currentFile, setCurrentFile] = useState(null)
  const [newFileName, setNewFileName] = useState("")
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)

    if (uploadedFiles.length > 0) {
      const newFiles = uploadedFiles.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: formatFileSize(file.size),
        file: file,
      }))

      setFiles([...files, ...newFiles])
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(0) + "KB"
    else return (bytes / 1048576).toFixed(1) + "MB"
  }

  const handleDeleteFile = (id) => {
    setFiles(files.filter((file) => file.id !== id))
  }

  const openRenameDialog = (file) => {
    setCurrentFile(file)
    setNewFileName(file.name)
    setIsRenameDialogOpen(true)
  }

  const handleRename = () => {
    if (newFileName.trim() === "") return

    setFiles(files.map((file) => (file.id === currentFile.id ? { ...file, name: newFileName } : file)))

    setIsRenameDialogOpen(false)
  }

  const handleSave = () => {
    // Here you would typically send the files and reference link to your backend
    console.log("Files:", files)
    console.log("Reference Link:", referenceLink)
    // Show success message or redirect
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Work Samples</h2>
        <p className="text-sm text-muted-foreground">Keep your profile up-to-date.</p>
      </div>

      {/* Upload Area */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
            <File className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium">Upload file</h3>
          <p className="text-sm text-muted-foreground">Max. file size 10 MB</p>

          <Button variant="outline" className="mt-4 w-full max-w-md" onClick={() => fileInputRef.current.click()}>
            <Upload className="h-4 w-4 mr-2" />
            Add file
          </Button>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} multiple />
        </div>
      </div>

      {/* Uploaded Files */}
      <div className="space-y-2">
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <File className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">{file.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openRenameDialog(file)} className="p-2 text-gray-500 hover:text-gray-700">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => handleDeleteFile(file.id)} className="p-2 text-gray-500 hover:text-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reference Link */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Reference link <span className="text-muted-foreground">(optional)</span>
        </label>
        <Input
          placeholder="www.linkname.com"
          value={referenceLink}
          onChange={(e) => setReferenceLink(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">This could be a portfolio URL</p>
      </div>

      {/* Save Button */}
      <CustomButton className="w-full bg-black hover:bg-black/90" onClick={handleSave}>
        Save
      </CustomButton>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter new file name"
            />
          </div>
          <DialogFooter>
            <CustomButton variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </CustomButton>
            <Button onClick={handleRename}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WorkSamples