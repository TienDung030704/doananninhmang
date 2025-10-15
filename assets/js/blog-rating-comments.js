/**
 * Blog Rating & Comments System
 * Author: Nguyễn Tiến Dũng
 * Description: JavaScript functionality for blog rating and comments system
 */

// Rating System
function initRatingSystem() {
  const stars = document.querySelectorAll(".star");
  const submitRatingBtn = document.getElementById("submitRating");
  const ratingMessage = document.getElementById("ratingMessage");
  let selectedRating = 0;

  if (!stars.length || !submitRatingBtn) return;

  stars.forEach((star) => {
    star.addEventListener("mouseover", () => {
      const rating = parseInt(star.dataset.rating);
      highlightStars(rating);
    });

    star.addEventListener("mouseout", () => {
      highlightStars(selectedRating);
    });

    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.rating);
      highlightStars(selectedRating);
      submitRatingBtn.disabled = false;
    });
  });

  function highlightStars(rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  }

  submitRatingBtn.addEventListener("click", () => {
    if (selectedRating > 0) {
      // Simulate API call
      submitRatingBtn.disabled = true;
      submitRatingBtn.textContent = "Đang gửi...";

      setTimeout(() => {
        ratingMessage.style.display = "block";
        ratingMessage.className = "rating-message success";
        ratingMessage.textContent = `Cảm ơn bạn đã đánh giá ${selectedRating} sao! Đánh giá của bạn đã được ghi nhận.`;
        submitRatingBtn.textContent = "Đã gửi";
      }, 1000);
    }
  });
}

// Comments System
function initCommentsSystem() {
  const commentForm = document.getElementById("commentForm");
  const commentsList = document.querySelector(".comments-list");
  const commentsCount = document.querySelector(".comments-count");

  if (!commentForm || !commentsList) return;

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("commentName").value;
    const email = document.getElementById("commentEmail").value;
    const content = document.getElementById("commentContent").value;

    if (name && email && content) {
      addComment(name, content);
      commentForm.reset();
    }
  });

  function addComment(name, content) {
    const newComment = document.createElement("div");
    newComment.className = "comment";

    const avatar = name.charAt(0).toUpperCase();
    const currentTime = "vừa xong";

    newComment.innerHTML = `
      <div class="comment-header">
        <div class="comment-author">
          <div class="author-avatar">${avatar}</div>
          <div class="author-info">
            <h5>${name}</h5>
            <span class="comment-date">${currentTime}</span>
          </div>
        </div>
      </div>
      <div class="comment-content">
        <p>${content}</p>
      </div>
      <div class="comment-actions">
        <button class="comment-action like-btn">
          <i class="bi bi-heart"></i>
          <span class="like-count">0</span>
        </button>
        <button class="comment-action reply-btn">
          <i class="bi bi-reply"></i>
          Trả lời
        </button>
      </div>
    `;

    // Insert at the beginning of comments list
    commentsList.insertBefore(newComment, commentsList.firstChild);

    // Update comments count
    if (commentsCount) {
      const currentCount = parseInt(commentsCount.textContent);
      commentsCount.textContent = currentCount + 1;
    }

    // Add like functionality to new comment
    const likeBtn = newComment.querySelector(".like-btn");
    addLikeFunctionality(likeBtn);

    // Scroll to new comment
    newComment.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Add like functionality to existing comments
  document.querySelectorAll(".like-btn").forEach(addLikeFunctionality);

  // Reply functionality
  document.querySelectorAll(".reply-btn").forEach((replyBtn) => {
    replyBtn.addEventListener("click", () => {
      alert("Chức năng trả lời đang được phát triển!");
    });
  });

  // Load more comments
  const loadMoreBtn = document.querySelector(".load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      alert("Đã hiển thị tất cả bình luận!");
    });
  }
}

// Like functionality
function addLikeFunctionality(likeBtn) {
  if (!likeBtn) return;

  likeBtn.addEventListener("click", () => {
    const likeCount = likeBtn.querySelector(".like-count");
    const currentLikes = parseInt(likeCount.textContent);
    const heart = likeBtn.querySelector("i");

    if (heart.classList.contains("bi-heart")) {
      heart.classList.remove("bi-heart");
      heart.classList.add("bi-heart-fill");
      likeCount.textContent = currentLikes + 1;
      likeBtn.style.color = "#e74c3c";
    } else {
      heart.classList.remove("bi-heart-fill");
      heart.classList.add("bi-heart");
      likeCount.textContent = currentLikes - 1;
      likeBtn.style.color = "";
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initRatingSystem();
  initCommentsSystem();
});

// Also initialize if script is loaded after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initRatingSystem();
    initCommentsSystem();
  });
} else {
  initRatingSystem();
  initCommentsSystem();
}
