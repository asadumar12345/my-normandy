import { message } from "antd";

// upload file props
export const imageUploadProps = {
  name: "file",
  multiple: false,
  // action: BASE_URL + UPLOAD_API,
  // headers: {
  //   authorization: `Bearer ${TOKEN}`,
  // },
  beforeUpload: (file) => {
    const fileExtension = file.name.split(".")[1];
    const isCorrectType =
      file.type === "image/jpeg" ||
      fileExtension === "jpeg" ||
      file.type === "image/png" ||
      fileExtension === "png" ||
      file.type === "image/jpg" ||
      fileExtension === "jpg";
    if (!isCorrectType) {
      message.error("You can only upload jpg/jpeg/png images!");
    }
    const isCorrectSize = file.size / 1024 / 1024 <= 10;
    if (!isCorrectSize) {
      message.error("Image must be smaller than 10MB!");
    }
    return isCorrectType && isCorrectSize;
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} Image uploaded successfully.`);
    } else if (status === "error") {
      message.error(`Image upload failed`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
