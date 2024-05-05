let counter = 3 // <!-- Playlist X starting at 3; increment it at the beginning -->

// basic idea is to just yoink from the localStorage and then create the html for the playlist
function playlistHTML()
{
    //setup
    let main = document.getElementById( "main" )
    counter++; //counter will reflect next playlist
    let comment = document.createComment( "playlist " + counter )

    //localStorage getters
    let name = localStorage.getItem( "playlist-name" )
    let imgUrl = localStorage.getItem( "image-url" )
    let spotifyUrl = localStorage.getItem( "spotify-url" )
    let description = localStorage.getItem( "playlist-description" )

    //elemental and elemental attribute creation
    let h2 = document.createElement( "h2" )
    h2.textContent = name

    let figcaption = document.createElement( "figcaption" )
    figcaption.className = "playlist-description"
    figcaption.textContent = description

    let img = document.createElement( "img" )
    img.src = imgUrl
    img.alt = "ActivityMixr generated playlist"
    img.className = "playlist-image"

    let figure = document.createElement( "figure" )
    figure.appendChild( img )
    figure.appendChild( figcaption )

    let a = document.createElement( "a" )
    a.href = spotifyUrl
    a.className = "spotify-link"
    a.target = "_blank"
    a.textContent = "Listen on Spotify!"

    //div comes last because we just append all the html elements to div
    let div = document.createElement( "div" )
    div.className = "activity-playlist"
    div.appendChild( h2 )
    div.appendChild( figure )
    div.appendChild( a )

    main.append( comment )
    main.appendChild( div )

    //deletes items so that same playlist isn't generated over and over
    localStorage.removeItem("playlist-name")
    localStorage.removeItem("spotify-url")
    localStorage.removeItem("image-url")
    localStorage.removeItem("playlist-description")
}