import { Link } from 'react-router-dom'
import arrowIcon from './../../assets/back-icon.svg'

const style = {
  fontSize: '1.7em',
  fontWeight: 'bold',
}

const Heading = (props) => (
  <div className="w-100 mb-30 heading ms-">
    <div>
      <h1 style={style}>{props.title}</h1>
    </div>
    <div>
      <Link to={`../`}>
        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.02679 1.16638L1.58027 6.95422C1.44118 7.10202 1.44118 7.34165 1.58027 7.48946L7.02679 13.2773"
            stroke="#333"
            strokeWidth="1.70486"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    </div>
  </div>
)

export default Heading

Heading.defaultProps = {
  title: 'DeezStealth',
  lead: '',
}
