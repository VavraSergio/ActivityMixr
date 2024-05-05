document.getElementById('submission').addEventListener('click', function (event) {
    event.preventDefault();
    let activity;

    let participants = document.getElementById('participants').value;
    let apiUrl = 'https://www.boredapi.com/api/activity?';


    let type = document.getElementById('type').value;

    let accessibility = document.getElementById('accessibility').value;

    let price = document.getElementById('price').value;


    let count = 0;

    if (!(participants === '')) {
        apiUrl += 'participants=' + participants;
        count += 1;
    }

    if (!(type === 'any')) {
        if (count > 0) {
            apiUrl += '&';
        }
        apiUrl += 'type=' + type;
        count += 1;
    }

    if (!(parseInt(accessibility) === 0)) {
        if (count > 0) {
            apiUrl += '&';
        }
        apiUrl += 'accessibility=' + accessibility;

        count += 1;
    }

    if (!(parseInt(price) === 0)) {
        if (count > 0) {
            apiUrl += '&';
        }
        apiUrl += 'price=' + price;
        count += 1;
    }
    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];


    var randomNumber = Math.floor(Math.random() * 10) + 1;

    if (randomNumber === 1) {
        document.getElementById("modal-text").textContent = 'Go gambling!';
        modal.style.display = "block";
        setTimeout(() => {
            window.location.href = "https://wanghci.github.io/project-milestone-2-gambler-s-paradise/";
        }, "2000");
        return;
    } else {

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {

                if (!data.activity || data.activity === '') {
                    document.getElementById("modal-text").textContent = 'No activity found with those parameters!';
                    modal.style.display = "block";
                    return;
                }
                document.getElementById("modal-text").textContent = data.activity;
                activity = data.activity;
                modal.style.display = "block";

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    document.getElementById("backBtn").onclick = function () {
        modal.style.display = "none";
    }

    document.getElementById("generateBtn").onclick = async function () {

        if (!(document.getElementById("modal-text").textContent === 'No activity found with those parameters!')) {

            const accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                console.error("Spotify access token not found!");
                return;
            }

            const query = encodeURIComponent(activity);

            const apiUrl = `https://api.spotify.com/v1/search?q=${query}&type=playlist&market=US&limit=1`;

            const payload = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }

            try {
                const response = await fetch(apiUrl, payload)
                const responseData = await response.json()
                const playlist = responseData.playlists.items[0];
                if (playlist) // if the playlist is valid, all the .notation should be valid, with the exception of description which can be blank
                {
                    imageUrl = playlist.images[0].url
                    spotifyUrl = playlist['external_urls']['spotify']

                    // Clear existing localStorage items
                    localStorage.removeItem("spotify-url")
                    localStorage.removeItem("image-url")
                    localStorage.removeItem("playlist-description")

                    localStorage.setItem("spotify-url", spotifyUrl)
                    localStorage.setItem("image-url", imageUrl)
                    localStorage.setItem("playlist-description", "Unfortunately, there was no description, but I hope this will suffice")
                    if (playlist.description.length > 0) {
                        localStorage.setItem("playlist-description", playlist.description)
                    }
                    console.log("Playlist generated successfully:", playlist)
                    localStorage.setItem("generate", "true")
                    window.location.href = "https://wanghci.github.io/project-milestone-2-team-azuresergio/playlist.html"
                }
            } catch (error) {
                console.error('Error generating playlist:', error)
            }
        }
        modal.style.display = "none";
    }
});

document.getElementById('accessibility').addEventListener('input', function () {
    document.getElementById('accessibilityValue').textContent = this.value;
});

document.getElementById('price').addEventListener('input', function () {
    document.getElementById('priceValue').textContent = this.value;
}); //test

document.getElementById('lucky').addEventListener('click', function (event) {
    event.preventDefault();
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    let apiUrl = 'https://www.boredapi.com/api/activity?';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("playlist-name", data.activity);
            luckyGen(localStorage.getItem("playlist-name"))
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    async function luckyGen(activity) {
        if (!(document.getElementById("modal-text").textContent === 'No activity found with those parameters!')) {

            const accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                console.error("Spotify access token not found!");
                return;
            }

            const query = encodeURIComponent(activity);

            const apiUrl = `https://api.spotify.com/v1/search?q=${query}&type=playlist&market=US&limit=1`;


            const payload = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }

            try {
                const response = await fetch(apiUrl, payload)
                const responseData = await response.json()
                const playlist = responseData.playlists.items[0];
                if (playlist) {
                    imageUrl = playlist.images[0].url
                    spotifyUrl = playlist['external_urls']['spotify']

                    // Clear existing localStorage items
                    localStorage.removeItem("spotify-url")
                    localStorage.removeItem("image-url")
                    localStorage.removeItem("playlist-description")

                    localStorage.setItem("spotify-url", spotifyUrl)
                    localStorage.setItem("image-url", imageUrl)
                    localStorage.setItem("playlist-description", "Unfortunately, there was no description, but I hope this will suffice")
                    if (playlist.description.length > 0) {
                        localStorage.setItem("playlist-description", playlist.description)
                    }
                    //store this in localStorage so that playlist.html knows to generate
                    localStorage.setItem("generate", "true")
                    console.log("Playlist generated successfully:", playlist)

                    window.location.href = "https://wanghci.github.io/project-milestone-2-team-azuresergio/playlist.html"
                }
            } catch (error) {
                console.error('Error generating playlist:', error)
            }
        }
    }
})