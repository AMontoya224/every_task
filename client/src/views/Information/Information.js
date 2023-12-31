import React, { useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Information.css';


function Information( props ){
    const { token, onToken } = props;

    useEffect( () => {
        if( token === null ){
            localStorage.removeItem( 'token' );
            localStorage.removeItem( 'user' );
            onToken( null );
            props.history.push( '/' )
        }
    }, []);

    return (
        <div className='information'>
            <section className='one'>
                <div>
                    <h1>
                        Organiza tu tiempo y tu vida, por fin
                    </h1>
                    <p>
                        Concéntrate, organízate y trae calma a tu vida con Every Task. La aplicación de listas y gestión de tareas n.º 1 del mundo.
                    </p>
                    <div>
                        <Link to='/register' className='d'>
                            <p>Prueba ahora</p>
                        </Link>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 320"><path fill="#2c54cc" fill-opacity="2" d="M0,160L11.4,149.3C22.9,139,46,117,69,101.3C91.4,85,114,75,137,80C160,85,183,107,206,128C228.6,149,251,171,274,165.3C297.1,160,320,128,343,128C365.7,128,389,160,411,160C434.3,160,457,128,480,122.7C502.9,117,526,139,549,176C571.4,213,594,267,617,272C640,277,663,235,686,218.7C708.6,203,731,213,754,218.7C777.1,224,800,224,823,218.7C845.7,213,869,203,891,192C914.3,181,937,171,960,181.3C982.9,192,1006,224,1029,218.7C1051.4,213,1074,171,1097,170.7C1120,171,1143,213,1166,240C1188.6,267,1211,277,1234,272C1257.1,267,1280,245,1303,250.7C1325.7,256,1349,288,1371,272C1394.3,256,1417,192,1429,160L1440,128L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 220"><path fill="#B7B7B7" fill-opacity="2" d="M0,128L17.1,128C34.3,128,69,128,103,122.7C137.1,117,171,107,206,128C240,149,274,203,309,218.7C342.9,235,377,213,411,181.3C445.7,149,480,107,514,96C548.6,85,583,107,617,133.3C651.4,160,686,192,720,181.3C754.3,171,789,117,823,112C857.1,107,891,149,926,149.3C960,149,994,107,1029,128C1062.9,149,1097,235,1131,245.3C1165.7,256,1200,192,1234,138.7C1268.6,85,1303,43,1337,32C1371.4,21,1406,43,1423,53.3L1440,64L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"></path></svg>
            </section>
            <section className='two'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2c54cc" fill-opacity="1" d="M0,96L48,80C96,64,192,32,288,26.7C384,21,480,43,576,80C672,117,768,171,864,170.7C960,171,1056,117,1152,101.3C1248,85,1344,107,1392,117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#B7B7B7" fill-opacity="1" d="M0,256L48,213.3C96,171,192,85,288,69.3C384,53,480,107,576,149.3C672,192,768,224,864,202.7C960,181,1056,107,1152,74.7C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                <div>
                    <b>
                        Despeja tu mente
                    </b>
                    <h3>
                        La forma más rápida de sacar las tareas de tu cabeza
                    </h3>
                    <p>
                        Escribe casi cualquier cosa en el campo de tarea y el reconocimiento de lenguaje coloquial de Todoist, único en su tipo, te ayudará a crear tu lista de tareas al instante.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default withRouter(Information);