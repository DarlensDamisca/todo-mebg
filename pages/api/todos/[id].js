import dbConnect from '../../../lib/dbConnect';
import Todo from '../../../models/Todo';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const todo = await Todo.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!todo) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedTodo = await Todo.deleteOne({ _id: id });
        if (!deletedTodo) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}