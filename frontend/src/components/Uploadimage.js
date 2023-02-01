import axios from "axios"
import { useState } from "react"

const Uploadimage = () => {
    const [file, setFile] = useState({})
    const [imagePre, setImagePre] = useState(null)

    const handleUpload = (e) => {
        // console.log(e.target.files[0])

        if (e.target.files[0]) {

            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setFile(file)
                setImagePre(reader.result)
            }
            reader.readAsDataURL(file)
        }
        
    }
    const onClickUpload = async () => {
        const formData = new FormData()
        formData.append('file', file)
        const uploadIma = await axios.post('http://127.0.0.1:4000/upload', formData)
    }
    return <div>
        <form>

            <img src={imagePre} style={{ width: "200px", height: "200px" }}></img>
            <br></br>
            <label>Image Product :</label>
            <input onChange={handleUpload} type="file" />
            <button onClick={onClickUpload}>Upload</button>
        </form>
    </div>
}
export default Uploadimage