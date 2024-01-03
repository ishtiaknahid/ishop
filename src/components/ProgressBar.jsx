// eslint-disable-next-line react/prop-types
const ProgressBar = ({status}) => {
  let color, progressWidth;
  console.log(status)

  switch (status) {
    case 'pending':
      color = 'blue-500';
      progressWidth = 5;
      break;
    case 'processing':
      color = 'orange-500';
      progressWidth = 37;
      break;
    case 'shipped':
      color = 'green-500';
      progressWidth = 67;
      break;
    case 'delivered':
      color = 'acqa'; 
      progressWidth = 100;
      break;
    default:
      color = 'red-500';
      progressWidth = 0;
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`relative h-2 rounded-2xl w-full bg-gray-200 shadow-2xl`}>
        <div className={`h-full bg-${color}`} style={{ width: `${progressWidth}%`}}></div>
      </div>
      <div className="flex justify-between w-full text-sm text-gray-500 dark:text-gray-400">
        <span className={`${progressWidth >= 5 ? `text-blue-500` : ''}`}>Order Placed</span>
        <span className={`${progressWidth >= 37 ? `text-orange-500` : ''}`}>Processing</span>
        <span className={`${progressWidth >= 67 ? `text-green-500` : ''}`}>Shipped</span>
        <span className={`${progressWidth >= 100 ? `text-acqa` : ''}`}>Delivered</span>
      </div>
    </div>
  );
};

export default ProgressBar;
