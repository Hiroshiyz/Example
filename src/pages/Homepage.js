import React, { useState, useEffect } from "react";
import Search from "../component/Search";
import Pic from "../component/Pic";
import axios from "axios";
const Homepage = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState(null); //代表他沒有任何的數據null
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "lONVONgOzjcUVa3y6nARHirppe1xEj3Z7YCLhbtzBtrVwZTS0VpaffGT";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos);
    setCurrentSearch(input);
  };
  //Closure
  const morePicture = async () => {
    let moreURL;
    setPage(page + 1);
    if (currentSearch === "") {
      moreURL = `https://api.pexels.com/v1/curated?page=${
        page + 1
      }&per_page=15`;
    } else {
      moreURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }
    let result = await axios.get(moreURL, {
      headers: { Authorization: auth },
    });
    setData(data.concat(result.data.photos));
  };
  useEffect(() => {
    search(initialURL);
  }, []);
  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            //Logical operator && 如果左手邊是true會運算右邊的值 反之false則運算左手邊的值
            //data 本身是null是無法使用的 所以要用&&logical operator
            return <Pic data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;
