

#pragma strict

//////////////////////////////////////////////////////////////////
//          MOTORBIKE -- PHYSICS  v0.1    the7347@hotmail.com
/////////////////////////////////////////////////////////////////

// MOTORBIKE PROPIEDADES
var CoM : Transform; // centro de masa del rigidbody
private var CurSpeed : float; // velocidad actual de la moto
private var MaxSpeed = 400f; // Velocidad Maxima
private var MinSpeed = 0.0f; // Velocidad Minima
private var Gears : int[] = [15, 30, 60, 120, 240, 350, 400]; // cambios de velocidad (7 gears)
private var CurGear : int = 0; // actual cambio
private var Torque : float = 40; // fuerza positiva aplicada al wheelCollider
private var MaxTorque : float = 1000; // fuerza maxima aplicada a los wheel colliders
private var Freno : float = -20; //  fuerza negativa aplicada al wheelCollider
// TRANSFORM / VISUALS PARTS
var WheelF : WheelCollider; // WheelCollider de la rueda frontal
var WheelR : WheelCollider; // WheelCollider de la rueda trasera
var WFmesh : Transform; // Componente transform de la rueda frontal
var WRmesh : Transform; // Componente transform de la rueda trasera
var SteerAngle : float = 0; // angulo de rotacion de la rueda (mesh) delantera
private var RotVal1 : float = 0.0;
private var RotVal2 : float = 0.0;
  
///////////////////////////////////////////////////////////////////////////////////////////
function Start ()
{
	// AJUSTE DEL CENTRO DE MASA
	rigidbody.centerOfMass = Vector3(CoM.localPosition.x, CoM.localPosition.y, CoM.localPosition.z);
	
	rigidbody.interpolation = RigidbodyInterpolation.Interpolate;
	
}
///////////////////////////////////////////////////////////////////////////////////////////
function FixedUpdate ()
{
      		
   // AJUSTES DEL ANGULAR DRAG PARA ESTABILIZAR LA MOTO
   if (CurSpeed > 50 && WheelF.isGrounded)
		{
			rigidbody.angularDrag = 8;
		}	
    else if (CurSpeed > 50 && !WheelF.isGrounded)
		{
			WaitForSeconds(1.5);
			rigidbody.angularDrag = 3;
		}
 	
	if (WheelF.isGrounded && WheelR.isGrounded)
	   {
   			if ( Vector3.Angle( Vector3.up, transform.up ) > 45 && Input.GetAxis("Horizontal") ) 
   	 			 {
  					rigidbody.AddRelativeTorque (Vector3.forward * 5000 * Input.GetAxis("Horizontal"));
      			 }
      		else {  rigidbody.angularDrag = 8;  }	 
	   }  
	// FUERZA MIENTRAS ESTA EN EL AIRE
	else 
		{	       
			if (Input.GetKey (KeyCode.W))
				{   	rigidbody.AddRelativeTorque (Vector3.right * 1500 * Input.GetAxis("Vertical"));          		}
			if (Input.GetKey (KeyCode.S))
				{  		rigidbody.AddRelativeTorque (Vector3.left * -1500 * Input.GetAxis("Vertical"));    	        	}   
			if (Input.GetKey (KeyCode.D)) 
				{		rigidbody.AddRelativeTorque (Vector3.back * 550 * Input.GetAxis("Horizontal")); 		        }
			if (Input.GetKey (KeyCode.A))
				{		rigidbody.AddRelativeTorque (Vector3.forward * -550 * Input.GetAxis("Horizontal")); 		}	    	
		}  
    
    // AJUSTES VISUALES 
    var hit1 : RaycastHit;	
	var CollPoint1 : Vector3 = WheelF.transform.TransformPoint( WheelF.center );	
	if ( Physics.Raycast( CollPoint1, -WheelF.transform.up, hit1, WheelF.suspensionDistance + WheelF.radius ) ) {
		WFmesh.transform.position = hit1.point + (WheelF.transform.up * WheelF.radius);	}else{
		WFmesh.transform.position = CollPoint1 - (WheelF.transform.up * WheelF.suspensionDistance);	}	
	WFmesh.transform.rotation = WheelF.transform.rotation * Quaternion.Euler( RotVal1, WheelF.steerAngle, 0 );
	RotVal1 += WheelF.rpm * ( 360/60 ) * Time.deltaTime;
	var GroundHit1 : WheelHit;
	WheelF.GetGroundHit( GroundHit1 );
	
    var hit2 : RaycastHit;	
	var CollPoint2 : Vector3 = WheelR.transform.TransformPoint( WheelR.center );	
	if ( Physics.Raycast( CollPoint2, -WheelR.transform.up, hit2, WheelR.suspensionDistance + WheelR.radius ) ) {
		WRmesh.transform.position = hit2.point + (WheelR.transform.up * WheelR.radius);	}else{
		WRmesh.transform.position = CollPoint2 - (WheelR.transform.up * WheelR.suspensionDistance);	}	
	WRmesh.transform.rotation = WheelR.transform.rotation * Quaternion.Euler( RotVal2, WheelR.steerAngle, 0 );
	RotVal2 += WheelR.rpm * ( 360/60 ) * Time.deltaTime;
	var GroundHit2 : WheelHit;
	WheelR.GetGroundHit( GroundHit2 );          
	     
}
///////////////////////////////////////////////////////////////////////////////////////////
function Update () 
{

   CurSpeed = rigidbody.velocity.magnitude*3.0;
	  
   WheelR.motorTorque = Torque * Input.GetAxis ("Vertical");
   WheelF.steerAngle = SteerAngle * Input.GetAxis ("Horizontal");	
		
						
    // STEERANGLE AJUSTE
   	if (CurSpeed > 30)
		{
			SteerAngle = 8; 
		}	
	if (CurSpeed > 60)
		{
			SteerAngle = 4;
		}	
	if (CurSpeed > 100)
		{
			SteerAngle = 2;
		}	
	if (CurSpeed > 150)
		{
			SteerAngle = 1;
		}						
	if (CurSpeed < 30)
		{
			SteerAngle = 30;
		}		
		if (Input.GetKeyDown(KeyCode.Escape))
            Application.LoadLevel("StartScene");

}



