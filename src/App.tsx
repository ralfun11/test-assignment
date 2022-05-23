import React, { useState } from "react";
import "./App.css";
import { Banner, Position } from "./components/banner/Banner";

type BannerType = {
  position: Position,
  id: number,
};

function App() {
  const [fileData, setFileData] = useState<string | ArrayBuffer | null>();
  const [banners, setBanners] = useState<Array<BannerType>>([]);

    const backgroundImage = fileData ? `url("${fileData}"` : "";

    const onImageAdded = (img: File | undefined) => {
      if(!img){
          return;
      }

        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.addEventListener("load", () => {
            setFileData(reader.result);
        });
    };

    const onClickHandler = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {

      if(fileData && e.currentTarget === e.target){
        const top = (e.clientY/window.innerHeight)*100;
        const left = (e.clientX/window.innerWidth)*100;

        setBanners([...banners, {
          position: {
            top,
            left,
          },
          id:left*top,
        }])
      }

    };

    const findAndDeleteBanner = (id:number) => setBanners(banners.filter((banner) => banner.id !== id));

  if(!fileData){
    return (
        <div className="file-input">
          <input
              type={"file"}
              alt={"placeholder"}
              onInputCapture={(event) => onImageAdded(event.currentTarget.files?.[0])}
          />
            <div>
                <p>Double click on banner removes it</p>
            </div>
        </div>
    );
  }

  return (
    <div
        onClick={onClickHandler}
        className={"backgroundImage"}
        style={{
          backgroundImage
        }}
    >
        {
          fileData && banners.map((banner) => <Banner position={banner.position} id={banner.id} remove={findAndDeleteBanner} key={banner.id} />)
        }
    </div>
  );
}

export default App;
