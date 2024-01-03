import { useState } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

// New Comment component
const CommentSection = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments((prevComments) => [...prevComments, comment]);
      setComment('');
      toast.success('Comment added!');
    } else {
      toast.error('Please enter a valid comment.');
    }
  };

  return (
    <div>
      <h2 className='text-2xl text-acqa font-semibold mb-6'>Comments</h2>
      <div>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black-300 dark:border-gray-600 focus:border-acqa dark:focus:border-acqa focus:outline-none focus:ring'
          placeholder='Add a comment...'
        ></textarea>
        <button
          className='bg-acqa -600 text-white font-semibold mt-4 py-2 px-4 rounded-md border-acqa -800 transition hover:bg-transparent hover:text-acqa -800 border mt-2'
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
      <div className='mt-4'>
        {comments.map((comment, index) => (
          <div key={index} className='bg-gray-100 p-2 mb-2 rounded-md'>
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

const RatingSystem = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className='flex items-center'>
      <span className='mr-2'>Rate this product:</span>
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => handleRatingChange(value)}
          className={`text-2xl cursor-pointer ${
            value <= rating ? 'text-acqa -800' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const SingleProductPage = () => {
  const [amount, setAmount] = useState(1);
  const [rating, setRating] = useState(0);
  const { productId } = useParams();
  console.log(productId);

  const { products } = useProduct();

  const singleProduct = products.filter((product) => product.id === productId);

  const { imgUrl, price, shopName, title, description } = singleProduct[0];

  const dispatch = useDispatch();

  const addCart = () => {
    dispatch(addToCart(singleProduct[0]));
    toast.success('Added to cart');
  };

  const handleRatingChange = (value) => {
    // Handle the rating change (you can send it to a backend, etc.)
    console.log('Selected Rating:', value);
  };

  return (
    <Layout>
      <div className='flex flex-col justify-around lg:flex-row gap-16 lg:items-center mb-10 p-5'>
        <div className='flex flex-col gap-6 lg:w-1/4'>
          <img
            src={imgUrl}
            alt={title}
            className='w-full h-full aspect-square object-cover rounded-xl  border border-acqa'
          />
        </div>
        {/* ABOUT */}
        <div className='flex flex-col gap-10 self-start mt-10 lg:w-2/4'>
          <div>
            <span className=' text-acqa -600 font-semibold'>{shopName}</span>
            <h1 className='text-3xl font-bold'>{title}</h1>
          </div>
          <RatingSystem onChange={handleRatingChange} />
          <p className='text-gray-700'>{description}</p>
          <h6 className='text-2xl font-semibold'>RM {price * amount}</h6>
          <div className='flex flex-row items-center gap-12'>
            <div className='flex flex-row items-center'>
              <button
                className='bg-gray-200 py-2 px-5 rounded-lg text-acqa -800 text-3xl'
                onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className='py-4 px-6 rounded-lg'>{amount}</span>
              <button
                className='bg-gray-200 py-2 px-4 rounded-lg text-acqa -800 text-3xl'
                onClick={() => setAmount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              className={`bg-acqa -800 text-white font-semibold py-3 px-16 rounded-xl h-full  border-acqa -800 transition
                    ${amount < 1 ? 'bg-acqa -500' : 'hover:bg-transparent hover:text-acqa -800 border'}
                    `}
              onClick={addCart}
              disabled={amount < 1}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* COMMENT SECTION */}
      <CommentSection />

    </Layout>
  );
};

export default SingleProductPage;
