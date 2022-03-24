// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

library Tree1 {
    function TreeSVGToString() public pure returns (bytes memory) {
        return
            bytes(
                abi.encodePacked(
                    '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="22px" height="62px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">',
                    '<g><path style="opacity:0.888" fill="#884d06" d="M 8.5,-0.5 C 9.5,-0.5 10.5,-0.5 11.5,-0.5C 11.8333,0.166667 12.1667,0.833333 12.5,1.5C 11.3569,1.90814 10.3569,2.57481 9.5,3.5C 11.2249,5.95675 11.7249,8.62342 11,11.5C 10.3292,10.7476 9.4959,10.4142 8.5,10.5C 8.16667,9.83333 7.83333,9.16667 7.5,8.5C 7.16667,7.83333 6.83333,7.16667 6.5,6.5C 4.37426,5.89677 2.04093,5.89677 -0.5,6.5C -0.5,5.83333 -0.5,5.16667 -0.5,4.5C 2.55473,3.96385 5.55473,3.13051 8.5,2C 9.59809,1.23029 9.59809,0.396953 8.5,-0.5 Z"/></g>',
                    '<g><path style="opacity:0.401" fill="#7c4203" d="M 12.5,1.5 C 14.5716,3.34952 15.9049,5.68285 16.5,8.5C 14.9256,8.06291 13.7589,7.06291 13,5.5C 13.0302,8.36148 12.1969,10.6948 10.5,12.5C 9.5,12.1667 8.83333,11.5 8.5,10.5C 9.4959,10.4142 10.3292,10.7476 11,11.5C 11.7249,8.62342 11.2249,5.95675 9.5,3.5C 10.3569,2.57481 11.3569,1.90814 12.5,1.5 Z"/></g>',
                    '<g><path style="opacity:1" fill="#a26a0a" d="M 3.5,-0.5 C 5.16667,-0.5 6.83333,-0.5 8.5,-0.5C 9.59809,0.396953 9.59809,1.23029 8.5,2C 5.55473,3.13051 2.55473,3.96385 -0.5,4.5C -0.5,4.16667 -0.5,3.83333 -0.5,3.5C 0.833333,2.16667 2.16667,0.833333 3.5,-0.5 Z"/></g>',
                    '<g><path style="opacity:1" fill="#723a00" d="M 6.5,6.5 C 4.90157,8.85672 3.90157,11.5234 3.5,14.5C 1.65832,12.8102 0.324982,10.8102 -0.5,8.5C -0.5,7.83333 -0.5,7.16667 -0.5,6.5C 2.04093,5.89677 4.37426,5.89677 6.5,6.5 Z"/></g>',
                    '<g><path style="opacity:1" fill="#6b3400" d="M 6.5,6.5 C 6.83333,7.16667 7.16667,7.83333 7.5,8.5C 6.88258,8.61071 6.38258,8.94404 6,9.5C 5.50454,11.4727 5.33788,13.4727 5.5,15.5C 5.67158,16.4916 5.33825,17.1583 4.5,17.5C 3.89022,16.609 3.55688,15.609 3.5,14.5C 3.90157,11.5234 4.90157,8.85672 6.5,6.5 Z"/></g>',
                    '<g><path style="opacity:0.864" fill="#683101" d="M 16.5,8.5 C 17.7052,12.4868 17.7052,16.4868 16.5,20.5C 15.5,20.1667 14.8333,19.5 14.5,18.5C 14.1667,17.5 13.5,16.8333 12.5,16.5C 11.8333,15.1667 11.1667,13.8333 10.5,12.5C 12.1969,10.6948 13.0302,8.36148 13,5.5C 13.7589,7.06291 14.9256,8.06291 16.5,8.5 Z"/></g>',
                    '<g><path style="opacity:1" fill="#444713" d="M 7.5,8.5 C 7.83333,9.16667 8.16667,9.83333 8.5,10.5C 8.83333,11.5 9.5,12.1667 10.5,12.5C 11.1667,13.8333 11.8333,15.1667 12.5,16.5C 9.58489,16.0874 7.75156,14.4207 7,11.5C 6.78997,13.0581 6.28997,14.3915 5.5,15.5C 5.33788,13.4727 5.50454,11.4727 6,9.5C 6.38258,8.94404 6.88258,8.61071 7.5,8.5 Z"/></g>',
                    '<g><path style="opacity:0.813" fill="#48551c" d="M 12.5,16.5 C 13.5,16.8333 14.1667,17.5 14.5,18.5C 12.6618,18.846 10.6618,18.846 8.5,18.5C 7.43764,19.4246 7.43764,20.4246 8.5,21.5C 8.16667,21.5 7.83333,21.5 7.5,21.5C 6.51163,20.205 5.51163,18.8717 4.5,17.5C 5.33825,17.1583 5.67158,16.4916 5.5,15.5C 6.28997,14.3915 6.78997,13.0581 7,11.5C 7.75156,14.4207 9.58489,16.0874 12.5,16.5 Z"/></g>',
                    '<g><path style="opacity:1" fill="#617625" d="M 14.5,18.5 C 14.8333,19.5 15.5,20.1667 16.5,20.5C 16.7678,22.099 16.4345,23.4324 15.5,24.5C 15.5,23.5 15.5,22.5 15.5,21.5C 13.1667,21.5 10.8333,21.5 8.5,21.5C 7.43764,20.4246 7.43764,19.4246 8.5,18.5C 10.6618,18.846 12.6618,18.846 14.5,18.5 Z"/></g>',
                    '<g><path style="opacity:0.71" fill="#879c2e" d="M 7.5,21.5 C 7.83333,21.5 8.16667,21.5 8.5,21.5C 10.8333,21.5 13.1667,21.5 15.5,21.5C 15.5,22.5 15.5,23.5 15.5,24.5C 14.8333,24.5 14.1667,24.5 13.5,24.5C 12.9045,21.8875 12.0712,21.8875 11,24.5C 10.6174,23.944 10.1174,23.6107 9.5,23.5C 8.5,23.1667 7.83333,22.5 7.5,21.5 Z"/></g>',
                    '<g><path style="opacity:1" fill="#b1ba4e" d="M 13.5,24.5 C 13.7373,25.791 13.404,26.791 12.5,27.5C 12.631,26.7611 12.4643,26.0944 12,25.5C 11.7996,27.3197 10.9663,28.653 9.5,29.5C 9.5,27.5 9.5,25.5 9.5,23.5C 10.1174,23.6107 10.6174,23.944 11,24.5C 12.0712,21.8875 12.9045,21.8875 13.5,24.5 Z"/></g>',
                    '<g><path style="opacity:0.125" fill="#b4b86c" d="M 13.5,24.5 C 14.1667,24.5 14.8333,24.5 15.5,24.5C 15.4349,27.4282 14.7682,30.0948 13.5,32.5C 12.5489,31.0813 12.2155,29.4147 12.5,27.5C 13.404,26.791 13.7373,25.791 13.5,24.5 Z"/></g>',
                    '<g><path style="opacity:1" fill="#dad487" d="M 12.5,27.5 C 12.2155,29.4147 12.5489,31.0813 13.5,32.5C 12.8857,36.1352 12.5524,39.8019 12.5,43.5C 11.609,42.8902 10.609,42.5569 9.5,42.5C 9.89385,41.0328 10.2272,39.5328 10.5,38C 10.3158,36.6244 9.64911,35.7911 8.5,35.5C 9.14952,33.5648 9.48285,31.5648 9.5,29.5C 10.9663,28.653 11.7996,27.3197 12,25.5C 12.4643,26.0944 12.631,26.7611 12.5,27.5 Z"/></g>',
                    '<g><path style="opacity:0.72" fill="#e9de9a" d="M 8.5,35.5 C 9.64911,35.7911 10.3158,36.6244 10.5,38C 10.2272,39.5328 9.89385,41.0328 9.5,42.5C 8.27187,43.3065 7.27187,44.3065 6.5,45.5C 7.16667,42.1667 7.83333,38.8333 8.5,35.5 Z"/></g>',
                    '<g><path style="opacity:0.853" fill="#adae49" d="M 9.5,42.5 C 10.609,42.5569 11.609,42.8902 12.5,43.5C 11.5808,46.7231 12.2475,49.7231 14.5,52.5C 13.6618,52.8417 13.3284,53.5084 13.5,54.5C 9.17643,51.5294 7.84309,47.5294 9.5,42.5 Z"/></g>',
                    '<g><path style="opacity:1" fill="#d9d382" d="M 9.5,42.5 C 7.84309,47.5294 9.17643,51.5294 13.5,54.5C 14.8333,55.1667 15.8333,56.1667 16.5,57.5C 10.7101,56.2098 7.0434,52.7098 5.5,47C 5.56993,46.2352 5.90326,45.7352 6.5,45.5C 7.27187,44.3065 8.27187,43.3065 9.5,42.5 Z"/></g>',
                    '<g><path style="opacity:0.626" fill="#a9a844" d="M 14.5,52.5 C 17.4732,53.8103 19.8065,55.8103 21.5,58.5C 21.5,59.5 21.5,60.5 21.5,61.5C 21.1667,61.5 20.8333,61.5 20.5,61.5C 19.1667,60.1667 17.8333,58.8333 16.5,57.5C 15.8333,56.1667 14.8333,55.1667 13.5,54.5C 13.3284,53.5084 13.6618,52.8417 14.5,52.5 Z"/></g>',
                    '</svg>'
                )
            );
    }
}
