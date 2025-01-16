import "./PopupItemDetails.css"

export default function PopupItemDetails(props) {

    const item = props.item

    return (
        <div>
            <div className="back" onClick={(event) => { event.stopPropagation(); props.close() }}></div>


            <div className="modal-justify">
                <div className="modal-screen">
                    <button className={`close-button`} onClick={(event) => { event.stopPropagation(); props.close() }}>&times;</button>

                    <div className="itemDetails-block">
                        <p className="itemDetails-title">{item.itemName}</p>

                        <div className="itemDetails-image-text">
                            <img className="itemDetails-image" src={item.image}/>

                            <div className="itemDetails-text">
                                <p className="itemDetails-text-price">Price: {item.price}$</p>

                                <p className="itemDetails-text-category">Category: {item.category}</p>

                                <p className="itemDetails-text-description">{item.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}