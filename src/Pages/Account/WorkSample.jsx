import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, File, Pencil, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import CustomButton from "@/components/CustomButton"
import useUserStore from "@/store/userStore"
import { toast } from "sonner"

function WorkSamples() {
  const { updateWorkSamples, loading } = useUserStore()

  const [imageFiles, setImageFiles] = useState([])
  const [docFiles, setDocFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [referenceLink, setReferenceLink] = useState("")
  const [processing, setProcessing] = useState(false)

  /* const [files, setFiles] = useState([
    { id: 1, name: "Document name", size: "300KB" },
    { id: 2, name: "Document name", size: "300KB" },
    { id: 3, name: "Document name", size: "300KB" },
  ])
  const [referenceLink, setReferenceLink] = useState("")
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [currentFile, setCurrentFile] = useState(null)
  const [newFileName, setNewFileName] = useState("")
  const fileInputRef = useRef(null) */

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = () => {
        reader.abort()
        reject(new Error("Problem reading file"))
      }
      reader.onload = () => resolve(reader.result)
      reader.readAsDataURL(file)
    })

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || [])
    setImageFiles((prev) => [...prev, ...files])
    const previews = files.map((f) => URL.createObjectURL(f))
    setImagePreviews((prev) => [...prev, ...previews])
  }

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDocSelect = (e) => {
    const files = Array.from(e.target.files || [])
    setDocFiles((prev) => [...prev, ...files])
  }

  const removeDoc = (index) => {
    setDocFiles((prev) => prev.filter((_, i) => i !== index))
  }

  //Warning: large files will produce very large requests.
  const convertFilesToDataUrls = async (files) => {
    const results = []
    for (const f of files) {
      // optional size limit check (e.g. 5MB)
      const MAX_MB = 5
      if (f.size / (1024 * 1024) > MAX_MB) {
        throw new Error(`${f.name} is larger than ${MAX_MB}MB`)
      }
      const dataUrl = await fileToDataUrl(f)
      results.push(dataUrl)
    }
    return results
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    try {
      const images = await convertFilesToDataUrls(imageFiles)
      const documents = await convertFilesToDataUrls(docFiles)

      const payload = {
        images,
        documents,
        referenceLink: referenceLink || "",
      }

      console.log("Work samples payload:", payload)

      // call store api - store expects { workSamples }
      await updateWorkSamples({ workSamples: payload })

      setImageFiles([])
      setDocFiles([])
      setImagePreviews([])
      setReferenceLink("")
      toast.success("Work samples updated")
    } catch (err) {
      console.error("Work samples error:", err)
      toast.error(err?.message || "Failed to update work samples")
    } finally {
      setProcessing(false)
    }
  }

 /*  const handleFileUpload = (e) => {
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
  } */

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(0) + "KB"
    else return (bytes / 1048576).toFixed(1) + "MB"
  }

  /* const handleDeleteFile = (id) => {
    setFiles(files.filter((file) => file.id !== id))
  } */

  const openRenameDialog = (file) => {
    setCurrentFile(file)
    setNewFileName(file.name)
    setIsRenameDialogOpen(true)
  }

  /* const handleRename = () => {
    if (newFileName.trim() === "") return

    setFiles(files.map((file) => (file.id === currentFile.id ? { ...file, name: newFileName } : file)))

    setIsRenameDialogOpen(false)
  } */

  /* const handleSave = () => {
    // Here you would typically send the files and reference link to your backend
    console.log("Files:", files)
    console.log("Reference Link:", referenceLink)
    // Show success message or redirect
  } */

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Work Samples</h2>
        <p className="text-sm text-muted-foreground">Keep your profile up-to-date.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Images (jpg, png)</label>
          <Input type="file" accept="image/*" multiple onChange={handleImageSelect} />
          <div className="flex gap-3 mt-3 flex-wrap">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative w-24 h-24 border rounded overflow-hidden">
                <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Documents (pdf, docx)</label>
          <Input type="file" accept=".pdf,.doc,.docx" multiple onChange={handleDocSelect} />
          <ul className="mt-2 space-y-1 text-sm">
            {docFiles.map((f, i) => (
              <li key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="truncate mr-2">{f.name}</span>
                <button type="button" onClick={() => removeDoc(i)} className="text-red-500">Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Reference link</label>
          <Input value={referenceLink} onChange={(e) => setReferenceLink(e.target.value)} placeholder="https://linkedin.com/in/johndoe" />
        </div>

        <Button type="submit" className="w-full bg-black" disabled={processing || loading}>
          {processing || loading ? "Saving..." : "Save work samples"}
        </Button>
      </form>


      {/* Upload Area */}
      {/* <div className="bg-gray-50 rounded-lg p-8 text-center">
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
      </div> */}

      {/* Uploaded Files */}
      {/* <div className="space-y-2">
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
      </div> */}

      {/* Reference Link */}
      {/* <div className="space-y-2">
        <label className="text-sm font-medium">
          Reference link <span className="text-muted-foreground">(optional)</span>
        </label>
        <Input
          placeholder="www.linkname.com"
          value={referenceLink}
          onChange={(e) => setReferenceLink(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">This could be a portfolio URL</p>
      </div> */}

      {/* Save Button */}
      {/* <CustomButton className="w-full bg-black hover:bg-black/90" onClick={handleSave}>
        Save
      </CustomButton> */}

      {/* Rename Dialog */}
      {/* <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
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
      </Dialog> */}
    </div>
  )
}

export default WorkSamples