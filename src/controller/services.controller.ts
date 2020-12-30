import multer from "multer";
import config from "../config";
const upload = (type, ext) => (req, res) => {
  try {
    let imageUrl = `${config.ROOT_URL}/uploads/${type}/${req.file.filename}`;

    res.json({ imageUrl });
  } catch (e) {
    res.status(501).json({ error: e?.message });
  }
};

export { upload };
