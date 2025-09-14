document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".watch-later, .watched").forEach(button => {
        button.addEventListener("click", async function() {
            const title = this.dataset.title;
            const year = this.dataset.year;
            const poster = this.dataset.poster;
            const status = this.classList.contains("watched") ? "watched" : "watchlist";
            try {

                const response = await fetch("/movieList/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title, year, poster, status })
                });

                if (response.status === 401) {
                    window.location.href = "/login";
                    return;
                }

                const result = await response.json();
                alert(result.message);
            } catch (error) {
                alert("Error adding movie to watchlist");
            }
        });
    });

    document.querySelectorAll(".watched-btn").forEach(button => {
        button.addEventListener("click", async function() {
            const movieId = this.dataset.id;

            const response = await fetch("/movieList/watched", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ movieId })
            });

            const result = await response.json();
            if (result.success) {
                window.location.reload();
            } else {
                alert("Error marking movie as watched");
            }
        });
    });


    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", async function() {
            const movieId = this.dataset.id;

            const response = await fetch("/movieList/remove", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ movieId })
            });

            const result = await response.json();
            if (result.success) {
                window.location.reload();
            } else {
                alert("Error removing movie");
            }
        });
    });
});