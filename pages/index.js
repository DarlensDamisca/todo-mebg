import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    montant: '',
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingTodo) {
      await fetch(`/api/todos/${editingTodo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    }

    setFormData({ nom: '', prenom: '', montant: '' });
    setEditingTodo(null);
    setIsModalOpen(false);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormData({
      nom: todo.nom,
      prenom: todo.prenom,
      montant: todo.montant,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 dark:from-gray-900 dark:to-gray-800 text-white">
      <Head>
        <title></title>
        <meta name="description" content="To-Do List with Next.js and MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
          MEBG | liste des contributeurs
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors shadow-lg"
        >
          Ajouter
        </button>

        <div className="overflow-x-auto bg-blue-800/20 rounded-xl backdrop-blur-sm border border-blue-700/30 shadow-xl">
          <table className="min-w-full divide-y divide-blue-700/50">
            <thead className="bg-blue-900/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prénom</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-700/30">
              {todos.map((todo) => (
                <tr key={todo._id} className="hover:bg-blue-900/10 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{todo.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{todo.prenom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{todo.montant+" "+"Gourdes"}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="text-blue-300 hover:text-blue-200"
                    >
                      Modifier
                    </button>
                   {/*  <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Supprimer
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-900/80 backdrop-blur-md rounded-xl p-6 w-full max-w-md border border-blue-700/50 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-400">
              {editingTodo ? 'Modifier' : 'Ajouter'} un élément
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-blue-200 mb-2">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-blue-800/50 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-200 mb-2">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-blue-800/50 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-blue-200 mb-2">Montant</label>
                <input
                  type="number"
                  name="montant"
                  value={formData.montant}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-blue-800/50 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingTodo(null);
                    setFormData({ nom: '', prenom: '', montant: '' });
                  }}
                  className="px-4 py-2 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-medium transition-all shadow-md"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}