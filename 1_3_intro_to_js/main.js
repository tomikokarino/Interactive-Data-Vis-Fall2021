"use strict";

        let clicks = 0;

        function countClicks() {
          clicks += 1;
          document.getElementById("display").innerHTML = clicks;
        };

        function userName() {
            let x = 
                document.getElementById("userName").value;
            
            document.getElementById(
              "displayName").innerHTML = x;
        }