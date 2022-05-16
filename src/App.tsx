import React, { useState } from 'react';
import "./App.css"
import {Banner, Position} from "./components/banner/Banner";

type MouseCoordinates = {
  x: number,
  y: number
}

type BannerType = {
  position: Position,
  id: number
}

function App() {
  const [fileData, setFileData] = useState<string | ArrayBuffer | null>()
  const [initialPosition, setInitialPosition] = useState<MouseCoordinates>()
  const [banners, setBanners] = useState<Array<BannerType>>([])

    const backgroundImage = fileData ? `url("${fileData}"` : ""

    const onImageAdded = (img: File | undefined) => {
      if(!img){
          return
      }

        const reader = new FileReader();
        reader.readAsDataURL(img)
        reader.addEventListener("load", () => {
            setFileData(reader.result)
        });
    }

    const onMouseDownHandler = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {

      if(fileData && e.currentTarget === e.target){
        setInitialPosition({
        y: e.clientY,
        x: e.clientX
      })
    }}

    const onMouseUpHandler = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(e.currentTarget !== e.target){
      return;
    }

    if(Math.abs(initialPosition!.x - e.clientX) < 25 || Math.abs(initialPosition!.y - e.clientY) < 25){
      setInitialPosition(undefined)
      return
    }

    if(fileData){
      const moveToTheRight = e.clientX > initialPosition!.x
      const moveToTheBottom = e.clientY > initialPosition!.y

      const top = ((moveToTheBottom ? initialPosition!.y : e.clientY)/window.innerHeight)*100;
      const bottom = ((moveToTheBottom ? window.innerHeight - e.clientY : window.innerHeight - initialPosition!.y)/window.innerHeight)*100;
      const right = ((moveToTheRight ? window.innerWidth - e.clientX : window.innerWidth - initialPosition!.x)/window.innerWidth)*100;
      const left = ((moveToTheRight ? initialPosition!.x : e.clientX)/window.innerWidth)*100

      banners.push({
        position: {
          top,
          left,
          right,
          bottom,
        },
        id:left*top*bottom*right,
      })
      setInitialPosition(undefined)
    }
  }

    const findAndDeleteBanner = (id:number) => setBanners(banners.filter((banner) => banner.id !== id))

  if(!fileData){
    return (
        <div className="file-input">
          <input
              type={"file"}
              alt={"placeholder"}
              onInputCapture={(event) => onImageAdded(event.currentTarget.files?.[0])}
          />
        </div>
          )
  }

  return (
    <div onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} className={"backgroundImage"} style={{
     backgroundImage
    }} >
        {fileData && banners.map((banner) => <Banner position={banner.position} id={banner.id} remove={findAndDeleteBanner} key={banner.id} />)}
    </div>
  );
}

export default App;
