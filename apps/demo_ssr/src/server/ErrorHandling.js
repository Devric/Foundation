let express = require('express')


var app = express()

class CustomError extends Error {
	// message!: string;
  	// status!: number;
  	// additionalInfo!: any;

  constructor(message, status = 500, additionalInfo = {}) {
		super()
		this.message = message;
		this.status = status;
		this.additionalInfo = additionalInfo
		Object.setPrototypeOf(this, new.target.prototype)
  }
}

function handleError(
err,//: TypeError | CustomError,
req,//: Request,
res,//: Response,
next//: NextFunction
) {
  let customError = err;


	console.error(err)

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'Oh no, this is embarrasing. We are having troubles my friend'
    );
  }

  // we are not using the next function to prvent from triggering
  // the default error-handler. However, make sure you are sending a
  // response to client to prevent memory leaks in case you decide to
  // NOT use, like in this example, the NextFunction .i.e., next(new Error())
  res.status((customError).status).send(customError);
};




app.get('/', function(req,res,next){
	// test();
	throw new CustomError('forgot something?', 400, 'you can do better than that');
	res.send('ok')
})

// need to be the st middleware
app.use(handleError)


app.listen(2000)
