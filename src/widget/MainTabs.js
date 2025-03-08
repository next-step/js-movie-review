import { toElement } from "../shared/ui";

const tabs = ["상영 중", "인기순", "평점순", "상영 예정"];

export const MainTabs = () =>
  toElement({
    domString: `<ul class="tab">
    ${tabs
      .map(
        (tab, index) => `<li>
         <a href="#">
          <div class="tab-item ${index === 0 ? "selected" : ""}"><h3>${tab}</h3></div>
        </a>
      </li>`,
      )
      .join("")}
    </ul>`,
  });
