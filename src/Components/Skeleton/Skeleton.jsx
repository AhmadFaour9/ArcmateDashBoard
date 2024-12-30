/* eslint-disable react/prop-types */
import "./Skeleton.css"
import {CiImageOn} from 'react-icons/ci'
const Skeleton = ({ count }) => {
    return (
        // eslint-disable-next-line no-unused-vars
        <> {[...Array(count)].map((item) => (
            <div className="col" key={count}>
                <div
                    className="skelton-con">
                    <div className="skeleton-img">
                        <CiImageOn />
                    </div>
                    <p className="p-skeleton"></p>
                    <p className="p-skeleton"></p>
                    <p className="p-skeleton"></p>
                </div>
            </div>
        )
        )
        }
        </>
    )
}

export default Skeleton