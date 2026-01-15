export default function PostCard({ post, onClick }) {
  // Цвета для категорий
  const categoryColors = {
    Health: 'bg-green-100 text-green-700',
    Training: 'bg-purple-100 text-purple-700',
    Nutrition: 'bg-orange-100 text-orange-700',
    Behavior: 'bg-blue-100 text-blue-700',
    General: 'bg-gray-100 text-gray-700',
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[post.category] || categoryColors.General}`}>
          {post.category}
        </span>
        <span className="text-gray-400 text-xs">{new Date(post.date).toLocaleDateString()}</span>
      </div>
      
      <h3 className="text-xl font-extrabold mb-2 group-hover:text-blue-600 transition-colors">
        {post.title}
      </h3>
      
      <p className="text-gray-500 text-sm line-clamp-3 mb-4">
        {post.content}
      </p>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">
            {post.author[0]}
          </div>
          <span className="text-sm font-semibold text-gray-700">{post.author}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <span>❤️</span>
          <span className="text-sm font-bold">{post.likes}</span>
        </div>
      </div>
    </div>
  );
}