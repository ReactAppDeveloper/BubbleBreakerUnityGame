// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
// Do test the code! You usually need to change a few small bits.

using UnityEngine;
using System.Collections;

public class carscript: MonoBehaviour {
	public GUIStyle style;
	public int a=0;
	float speed = 18.0f;
	float rotationSpeed = 80.0f;

	void  Update (){
		float translation = Input.GetAxis ("Vertical") * speed;
		float rotation = Input.GetAxis ("Horizontal") * rotationSpeed;
		translation *= Time.deltaTime;
		rotation *= Time.deltaTime;
		transform.Translate(0f, 0f, translation);
		transform.Rotate(0f, rotation, 0f);

		if(a>300)
		{
			Application.Quit();
		}
		if (Input.GetKeyDown(KeyCode.Escape))
			Application.LoadLevel("StartScene");
	}
	void OnCollisionEnter (Collision col)
	{

		if (col.gameObject.name == "Cylinder Light Yellow") {
		a+=5;
			
			Destroy (col.gameObject);			
		} 
		if (col.gameObject.name == "Plane") {
			a-=3;


		} 
		if (col.gameObject.name == "ba") {

			Application.Quit();
			
		} 
		else if (col.gameObject.name == "Scene") {
			
			Application.LoadLevel("score");
			GUI.TextArea(new Rect(1,1,200,200),"SCORE: "+a,style);
			
		}
	}	
	void OnGUI(){
		
		GUI.TextArea(new Rect(1,1,200,200),"SCORE: "+a,style);

		}

	}
	
