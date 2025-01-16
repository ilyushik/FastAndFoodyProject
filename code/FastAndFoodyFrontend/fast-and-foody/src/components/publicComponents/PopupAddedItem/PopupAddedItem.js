import "./PopupAddedItem.css"

export default function PopupAddedItem(props) {
    return (
        <div>
            <div className="back-popup-added-item" onClick={(event) => { event.stopPropagation(); props.close() }}></div>


            <div className="modal-justify-popup-added-item">
                <div className="modal-screen-popup-added-item">
                    <button className={`close-button-popup-added-item`} onClick={(event) => { event.stopPropagation(); props.close() }}>&times;</button>

                    <div className="popup-added-item-block">
                        <p className="popup-added-item-text">You added item successfully</p>
                    </div>
                </div>
            </div>
        </div>
    )
}