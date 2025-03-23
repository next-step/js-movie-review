import { getFavoriteMovies, getMovieDetail } from "../api/movieApiClient";
import { eventEmitter, renderer } from "../shared/renderer";
import { toElement } from "../shared/ui";

export const AppDetail = () => { 

    const [detailState, setDetailState] = renderer.state("app-detail", false);
    const [detailData, setDetailData] = renderer.state("app-detail-data", {});
    
    const fetchData = async (movieId) => {
        const data = await getMovieDetail(movieId);
        setDetailData({...data});
    };

    const render = () => {

        const { 
            title,
            genres,
            release_date,
            belongs_to_collection,
            vote_average,
            overview
        } = detailData.value

        const container = toElement(`
            <div>
                    <div class="modal-background 
                    ${detailState.value ? 'active' :'' }
                    " id="modalBackground">
            <div class="modal">
                <button class="close-modal" id="closeModal">
                <img src="./images/modal_button_close.png" />
                </button>
                <div class="modal-container">
                <div class="modal-image">
                    <img
                    src="https://image.tmdb.org/t/p/original${belongs_to_collection?.backdrop_path ?? ''}"
                    />
                </div>
                <div class="modal-description">
                    <h2>${title}</h2>
                    <p class="category">
                    ${release_date} · ${genres?.map(genre => genre.name).join(",")}
                    </p>
                    <p class="rate">
                    <img src="./images/star_filled.png" class="star" /><span
                        >${vote_average}</span
                    >
                    </p>
                    <hr />
                    <p class="detail">
                    ${overview}
                    </p>
                </div>
                </div>
            </div>
            </div>
    </div>
    `

        );

        const closeButton = container.querySelector(".close-modal"); 

        closeButton.addEventListener("click", () => {
            console.log("CLOSED!", detailState.value)
            setDetailState(false)
            const newContainer = render();
            rootContainer.replaceWith(newContainer); // 기존 <header>를 새로운 <header>로 교체
            rootContainer = newContainer;
        })

        return container;
    }

    let rootContainer = render();

    eventEmitter.addEventListener("app-detail-info", (event) => {
        console.log("APP DETAIL : ", event.detail, detailState.value)
        fetchData(event.detail.id);
        setDetailState(!detailState.value)
        const newContainer = render();
        rootContainer.replaceWith(newContainer);
        rootContainer = newContainer;
    });

    eventEmitter.addEventListener("app-detail-data", () => {
        const newContainer = render();
        rootContainer.replaceWith(newContainer);
        rootContainer = newContainer;
    });

  return rootContainer;
}
