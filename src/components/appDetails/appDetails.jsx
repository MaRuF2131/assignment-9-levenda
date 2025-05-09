import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../mytoots/dataFetch/dataFetch';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from '../../mytoots/go top of page/logic';
import Handlelogout from '../../mytoots/handlelogout/handlelogout';

function CompanyDetails() {
  ScrollToTop({
    title: "app Details",
    fev: "https://cdn-icons-png.flaticon.com/512/25/25231.png"
  })
  const { Fetchdata} = useContext(DataContext);
  const { id } = useParams();
  const company = Fetchdata ? Fetchdata.find(item => item.id === id) : null;

  Handlelogout({nextnavigate:`/appDetails/${company.name}/${company.id}`})

  const [appDetails, setAppDetails] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const[Install, setInstall] = useState('Install');


  useEffect(() => {
    const fetchData = async () => {
      try {
        setAppDetails(company);
      } catch (error) {
        console.error('Error fetching app details:', error);
      }
    };

    fetchData();
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(savedReviews);
    setHasReviewed(savedReviews.length > 0);

    const savedRating = localStorage.getItem(`rating-${id}`);
    if (savedRating) {
      setUserRating(Number(savedRating));
    }

  }, [id]);

  const handleInstall = () => {
    if (Install==='Install'){ 
      setInstall('Uninstall');
    }else{
      setInstall('Install');
    }
    localStorage.setItem(`installed-${id}`, JSON.stringify("used"));
  };

  const handleFeadback = () => {
      setShowReview(true);
  };

  const handleReviewSubmit = () => {
    const installed = JSON.parse(localStorage.getItem(`installed-${id}`));
    console.log(installed);
    if(!(installed==='used')){
      alert('Please use the app before leaving a review.');
      return;
    } 
    if (reviewText.trim() === '') {
      alert('Please write a review before submitting.');
      return;
    }

    const newReview = {
      text: reviewText,
      author: 'You',
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    setReviewText('');
    setShowReview(false);
    setHasReviewed(true);
  };

  const handleDeleteReview = (indexToDelete) => {
    const updatedReviews = reviews.filter((_, i) => i !== indexToDelete);
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    if (updatedReviews.length === 0) {
      setHasReviewed(false);
    }
  };

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    localStorage.setItem(`rating-${id}`, rating);
  };

  if (!appDetails) {
    return (
      <div className="mt-10 text-lg text-center text-red-500">
        <div className="w-16 h-16 mx-auto border-4 border-dashed rounded-full animate-spin dark:border-lime-600"></div>
        App not found or still loading...?
      </div>
    );
  }



  return (
    <div>
        <div className="py-5 bg-gray-900 hover:bg-blue-100">
      <div className="flex flex-col p-8 mx-auto mt-8 rounded-md shadow-sm bg-slate-900 max-w-7xl text-cyan-300">
        <h1 className="mb-4 text-3xl font-bold">{appDetails.name}</h1>

        <Link to={appDetails.banner}>
          <img
            src={appDetails.thumbnail}
            alt={appDetails.name}
            className="object-cover w-40 h-40 mx-auto mb-4 rounded-lg"
          />
        </Link>
        <p>{appDetails.developer}</p>
        <p>{appDetails.viue}</p>
        <p>{appDetails.rating} ★★★</p>
        <p>{appDetails.category}</p>
        <p>{appDetails.description}</p>
        <p>{appDetails.features}</p>
      </div>

      <div className="flex flex-col p-8 mx-auto mt-2 shadow-sm bg-slate-900 rounded-2xl max-w-7xl text-gray-50">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-cyan-300">Your Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`cursor-pointer text-xl ${
                userRating >= star ? 'text-yellow-400' : 'text-gray-500'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <button onClick={handleInstall} className="mt-1 btn text-cyan-300 bg-slate-900 rounded-2xl">
          {Install}
        </button>
         <button onClick={handleFeadback} className="btn text-cyan-300 bg-slate-900 rounded-2xl">
             Leave Review
        </button>
      </div>

      {showReview && (
        <div className="flex flex-col p-8 mx-auto mt-8 shadow-sm rounded-2xl bg-slate-800 max-w-7xl text-gray-50">
          <h2 className="text-2xl font-semibold text-center">Your opinion matters!</h2>
          <textarea
            rows="3"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="p-4 mt-4 rounded-md resize-none text-cyan-300 bg-slate-900"
          ></textarea>
          <button
            onClick={handleReviewSubmit}
            type="button"
            className="py-3 mt-4 font-semibold  text-cyan-300 bg-slate-900 rounded-2xl"
          >
            Leave feedback
          </button>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="flex flex-col gap-4 p-8 mx-auto mt-8 bg-gray-800 rounded-md shadow-sm max-w-7xl text-gray-50">
          <h2 className="mb-2 text-xl font-bold">User Reviews:</h2>
          {reviews.map((review, index) => (
            <div key={index} className="relative p-4 bg-gray-700 rounded-md shadow-md">
              <p className="text-sm italic text-white">"{review.text}"</p>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{review.author}</span>
                <span>{review.date}</span>
              </div>
              <button
                onClick={() => handleDeleteReview(index)}
                className="absolute px-2 py-1 text-xs text-white rounded top-2 right-2 hover:bg-red-700"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/"
        className="flex flex-col p-8 mx-auto mt-6 text-center btn text-cyan-300 bg-slate-900 rounded-2xl max-w-7xl"
      >
        ← Back to Home
      </Link>
    </div>
    </div>
  );
}

export default CompanyDetails;
