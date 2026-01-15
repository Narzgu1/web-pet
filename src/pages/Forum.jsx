import { useState, useEffect } from 'react';
import ForumHeader from '../components/forum/ForumHeader';
import PostCard from '../components/forum/PostCard';
import PostModal from '../components/forum/PostModal';
import AddPostForm from '../components/forum/AddPostForm';
import initialPosts from '../data/posts.json';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Загружаем данные из localStorage или используем начальные
  useEffect(() => {
    const savedPosts = localStorage.getItem('forumPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
    }
  }, []);

  // Сохраняем в localStorage при изменении постов
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('forumPosts', JSON.stringify(posts));
    }
  }, [posts]);

  // Логика поиска
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <ForumHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onCreatePost={() => setShowAddForm(true)}
        />

        {/* Форма добавления */}
        {showAddForm && (
          <AddPostForm 
            onAddPost={handleAddPost} 
            onCancel={() => setShowAddForm(false)} 
          />
        )}

        {/* Список постов */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} onClick={handlePostClick} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No posts found
            </div>
          )}
        </div>

        {/* Модальное окно */}
        {selectedPost && (
          <PostModal 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)} 
          />
        )}
      </div>
    </div>
  );
}