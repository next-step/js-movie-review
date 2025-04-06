import { getFavoriteMovies, getMovieDetail } from "../api/movieApiClient";
import { eventEmitter, renderer } from "../shared/renderer";
import { replaceNewContainer } from "../shared/replace-container";
import { toElement } from "../shared/ui";

const setMovieStarScore = (movieId, number) => {
    localStorage.setItem(movieId, number);
}

const getMovieStarScore = (movieId) => {
    const value = localStorage.getItem(movieId)
    if (value) {
        return value;
    }
    setMovieStarScore(movieId, 0)
    return value

}

const MyStarScoreComponent = (movieId) => {

    const [scoreState, setScoreState] = renderer.state("my-star-score",  getMovieStarScore(movieId) ?? 0);


    const handleStarScoreBox = (e) => {
        if (e.target.tagName === 'IMG' ){
            setScoreState(e.target.dataset.score)
            setMovieStarScore(movieId, e.target.dataset.score)
        }
    }

    const render = () => {
        
        const container = toElement(
            `<div>
                <div class="starScores">
                    ${Array.from({ length: 5}).fill(0).map((val, index)=> {

                        const starScore = (index+1)*2;
                        return `<img src="${scoreState.value >= starScore ? 'star_filled.png' : 'star_empty.png'}" class="star" data-score="${starScore}">`
                    }).join("")}  <span class="score">${scoreState.value}</span>
                </div>
                
             </div>
            `
        )
  
            const starScoreBox = container.querySelector(".starScores");

            starScoreBox.addEventListener('click', handleStarScoreBox)
   
            return container
        }

        let rootContainer = render();

        eventEmitter.addEventListener("my-star-score", () => {
            rootContainer =  replaceNewContainer(rootContainer, render)
        });

        return rootContainer;

}

export const AppDetail = () => { 

    const [detailState, setDetailState] = renderer.state("app-detail", false);
    const [detailData, setDetailData] = renderer.state("app-detail-data", {});
    
    const fetchData = async (movieId) => {
        const data = await getMovieDetail(movieId);
        setDetailData({...data});
    };

    const render = () => {

        const { 
            id,
            title,
            genres,
            release_date,
            backdrop_path,
            vote_average,
            overview
        } = detailData.value

        const container = toElement(`
            <div>
                <div class="modal-background ${detailState.value ? 'active' :'' }" id="modalBackground">
                    <div class="modal">
                        <button class="close-modal" id="closeModal">
                        <img src="modal_button_close.png" />
                        </button>
                        <div class="modal-container">
                            <div class="modal-image">
                                <img
                                src="https://image.tmdb.org/t/p/original${backdrop_path ?? ''}"
                                />
                            </div>
                            <div class="modal-description">
                                <h2>${title}</h2>
                                <p class="category">
                                ${release_date} · ${genres?.map(genre => genre.name).join(",")}
                                </p>
                                <p class="rate">
                                <img src="star_filled.png" class="star" /><span
                                    >${vote_average}</span
                                >
                                </p>
                                <hr />
                                <div>
                                    <div>내 별점</div> 
                                    <div class="my-score-box">
                                    </div> 
                                
                                </div>
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
        const scoreBox = container.querySelector(".my-score-box"); 
        scoreBox.appendChild(MyStarScoreComponent(id));

        closeButton.addEventListener("click", () => {
            setDetailState(false)
            const newContainer = render();
            rootContainer.replaceWith(newContainer); // 기존 <header>를 새로운 <header>로 교체
            rootContainer = newContainer;
        })
        return container;
    }

    let rootContainer = render();

    eventEmitter.addEventListener("app-detail-info", (event) => {
        fetchData(event.detail.id);
        setDetailState(!detailState.value)
        rootContainer =  replaceNewContainer(rootContainer, render)
    });

    eventEmitter.addEventListener("app-detail-data", () => {
        rootContainer =  replaceNewContainer(rootContainer, render)
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && detailState.value) {
            setDetailState(false)
            rootContainer =  replaceNewContainer(rootContainer, render)
        } 
    })



  return rootContainer;
}
