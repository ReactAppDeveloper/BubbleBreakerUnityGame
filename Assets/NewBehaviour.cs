using UnityEngine;
using System.Collections;

public class NewBehaviourScript : MonoBehaviour {
	public GUIStyle style;
	public int a=0;

	// Use this for initialization
	void Start () {

	}

	// Update is called once per frame
	void Update () {
		transform.Translate (0f,0f,-Input.GetAxis("Vertical")*Time.deltaTime);
		transform.Translate (-Input.GetAxis("Horizontal")*Time.deltaTime,0f,0f);

		if(a>1)
		{
			Application.Quit();
		}
	}
	void OnCollisionEnter (Collision col)
	{
		if (col.gameObject.name == "Cube") {
						a++;

						Destroy (col.gameObject);
						audio.Play ();

						System.Threading.Thread.Sleep (500);
						audio.Stop ();

		
} 
	}

	void OnGUI(){
		
		GUI.TextArea(new Rect(1,1,500,500)," Hello World: "+a,style);
		//or

	}


}
