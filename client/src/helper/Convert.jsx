// Convert.jsx
export default function convertToBit64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      console.log("FileReader loaded:", fileReader.result);
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      console.error("FileReader error:", error);
      reject(error);
    };

    fileReader.readAsDataURL(file);
  });
}
