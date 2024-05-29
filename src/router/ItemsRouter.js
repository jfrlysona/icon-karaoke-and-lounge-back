import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  getItemsWithCategory,
  updateItem,
} from "../controller/ItemsController.js";
import { upload } from "../middleware/UploadMiddleware.js";
import { ItemsModel } from "../model/ItemsModel.js";

export const ItemsRouter = express.Router();

ItemsRouter.get("/items", getAllItems);
ItemsRouter.get("/items/:id", getItemById);
ItemsRouter.get("/items-with-category", getItemsWithCategory);
ItemsRouter.post("/items", upload.single("image"), createItem);
ItemsRouter.put("/items/:id", upload.single("image"), updateItem);
ItemsRouter.delete("/items/:id", deleteItem);

// ItemsRouter.put('/update-images', async (req, res) => {
//   try {
//     const host = 'icon-karaoke-and-lounge-back.onrender.com';
//     const protocol = 'https';

//     const items = await ItemsModel.find();
//     if (!items.length) {
//       return res.status(404).json({ message: 'No items found to update' });
//     }

//     const updates = items.map(item => {
//       if (item.image) {
//         return {
//           updateOne: {
//             filter: { _id: item._id },
//             update: { image: `${protocol}://${host}/api/images/${item.image.split('/').pop()}` }
//           }
//         };
//       } else {
//         console.warn(`Item with ID ${item._id} does not have an image field.`);
//         return null;
//       }
//     }).filter(update => update !== null); 

//     const result = await ItemsModel.bulkWrite(updates);

//     res.status(200).json({ message: 'Items updated successfully', result });
//   } catch (error) {
//     console.error('Error updating items:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// });
