﻿using UnityEngine;
using System.Collections;

public class cube : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        transform.Translate(0f, Input.GetAxis("Horizontal") * Time.deltaTime, -Input.GetAxis("Vertical") * Time.deltaTime);
        //transform.Rotate(0f, 0f, Input.GetAxis("Horizontal") * Time.deltaTime);
    }
}
