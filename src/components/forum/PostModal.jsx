export default function PostModal({ post, onClose }) {
    if (!post) return null;
  
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                {post.category}
              </span>
            </div>
          </div>
  
          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
  
          {/* Footer */}
          <div className="border-t p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm text-gray-600">
                <span>{post.views} views</span>
                <span>{post.replies} replies</span>
              </div>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
