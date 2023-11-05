import {Link} from 'react-router-dom'
import arrowIcon from './../../assets/arrow_icon.svg'

const style = {
  fontSize: '1.7em',
  fontWeight: 'bold'
}

const Heading = (props) => (
  <div className='d-flex align-items-center justify-content-between w-100 mb-30'>
    <div>
      <h1 style={style}>{props.title}</h1>
    </div>
    <div>
      <Link to={`../`}>
      <img src={arrowIcon} />
      </Link>
    </div>
  </div>
)

export default Heading

Heading.defaultProps = {
  title: 'DeezStealth',
  lead: '',
}
