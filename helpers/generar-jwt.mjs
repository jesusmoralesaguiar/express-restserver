import jsonwebtoken from 'jsonwebtoken'

const generarJWT = ( uid = '' ) => {

        return new Promise ( ( resolve, reject ) => {

            const payload = { uid };

            jsonwebtoken.sign( payload, process.env.SECRET_KEY, {
                expiresIn: '4h'
            }, (err, token ) => {
                if ( err ) {
                    console.log(err);
                    reject( 'No se pudo generar el JWT');
                } else {
                    resolve( token );
                }
            })

        })

}


export {generarJWT}