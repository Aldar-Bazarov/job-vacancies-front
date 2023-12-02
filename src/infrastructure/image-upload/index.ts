import { message } from "antd";
import { RcFile } from "antd/es/upload";

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Вы можете загружать фото только в формате JPG/PNG.");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Размер фото должен быть меньше 2MB.");
  }
  return isJpgOrPng && isLt2M;
};
