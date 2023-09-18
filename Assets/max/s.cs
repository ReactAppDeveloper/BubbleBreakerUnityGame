using UnityEngine;
using System.Collections;

public class s : MonoBehaviour {
	public GUIStyle style;
	public int a=0;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	void OnGUI(){
		
		GUI.TextArea(new Rect(1,1,50,200),"YOUR SCORE IS: "+a,style);
		
	}
}
