import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      let data = Object.entries(this.props.emotions);
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          <table className="table table-bordered">
            <tbody>
                {data.map(emotion => {
                    return <tr>
                        <td>{emotion[0]}</td>
                        <td>{emotion[1]}</td>
                    </tr>
                })}
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;