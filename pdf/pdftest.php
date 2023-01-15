<?php
    require_once './dompdf/autoload.inc.php';
    use Dompdf\Dompdf;
    use Dompdf\Options;

    // $options = new Options();
    // $options->set('isRemoteEnabled', true);
    // $options->set('isHtml5ParserEnabled', true);
    // $options->set('defaultFont', 'ArialMT');
    // $dompdf = new Dompdf($options);

    $dompdf = new Dompdf();
    $options = $dompdf->getOptions();
    $options->setDefaultFont('ArialMT');
    $options->setIsRemoteEnabled(TRUE);
    $contxt = stream_context_create([ 
        'ssl' => [
            'verify_peer' => FALSE,
            'verify_peer_name' => FALSE,
            'allow_self_signed'=> TRUE
        ]
    ]);
    $options->setHttpContext($contxt);
    $dompdf->setOptions($options);
    $dompdf->setPaper('letter');
    $html = 'Página 1</br>Base64:</br>';
    $html = $html.'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAAA8CAMAAACHIXJEAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAH5QTFRFLS4vaGlq////S0xNg4OEnZ2eWltbPD0/z8/PqqqraGhp3NzckJGRdXZ2t7e35+fndnd3kZGSt7i48/Pzz9DQq6usnZ6e9PT0xMTEg4SF29vb5+fow8PERi8sXTEqzT0W1z8WczMopjkgxDwZsDodzT0YZzQoiDclfTYmUTEsOqjBhAAAAwhJREFUeJztl9l22yAQhkGyhGIptqwFW3Kcunv7/i/YWRACr/S0ri/Kf5GDBwQfw8xAhIiKioqKior6V5IJ6NkQsyLOLUWcW/qvcdJFBsqFUFnxIh3T0sEpobvKskq5X6rlcomGVxjMH1Lz1XbaJZbOj5tSq4S1rjfwt8GPJ1O7sDidqFqyZc632CGFXFNHAWA1N9e56aQGqIB2H0KTt4kVzqV908rirDzTjKOrqaMQdkyrzBGv1TRuqy4D+ELuHe5rSy5AdxFN2XRoQTyeGCbs2DR4OCfbMYLP0l0y+WSExibIOTBwTy1t1hYNroyRoLCVpBOOBmhVIoCHA5uQZjfczLG5xm48fDhMMXDsBUjbQ01N4Cico+bePffK2Se502s6Gmr2cxNX50TcERi5WwbjaG6aw6qtv3h7o5/oO7uqsClnyYSdiZdX6Cjdh8YxL9jYfe/MNqf1cl7DXWozhdjEYH6kl3BodBscx2YWysY3cyDd7C+eOPVwvJLo4IiLODSbe7z3hM5os2VVTGd0hiP/BIeDfQ7+IB5Wmf59nN7mfahqA2MKwxmOOsOxSXsXx1SspE0DYRTETFfLebg2IW1n8z2ir4TyZRysfwPWqrdAnNHJW1LtnLVJIxdndJ13D6enfhkezAOdhiuqFXxwVL+0hyM518Th/XAdpzTIg+HC6t4GpTr6vvJNdDWgLR05dJiBXg2yZYD3D8fjx6s4dFm9ZJisXOhxh2MIT504Kug1o/BqSNYFzUZ+4oAEC92RW3DOp+Px+Pkqjpyn3Kt5leESwCnP3gVqsSLmjqk/mR5ocMgXwPl6FWcuHvvc8XhIttfo/rLrzOOBbmKl+X6mC5pwej0hNpSD3wDn+3UcQdkEtcMeUBOGQ3e/yfLaZgR4qNYbOU2m0JhKrQdrOvz4SR1Smv0LaHq3di48pVLerz2pPV5UF+jRh2m+0FFdcH14kNwSzM+J/NbwR4sKlfnfYNG6bM9RyQUHxA/2wGfSo6Q6t6Q8NY5ZeU8VZ9/1T43iqKioqKioqN/QL0zQInxcYXPdAAAAAElFTkSuQmCC" alt="" /> ';
    $html = $html.'<img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
    9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Example" />';
    $html = $html.'</br>Remote:</br>';
    $html = $html.'<img src="http://localhost/dompdf/logo.png" />';
    $html = $html.'</br>Local:</br>';
    $html = $html.'<img src="./logo.png" />';
    $html = $html.'<div style="page-break-before: always;"></div>';
    $html = $html.'Página 2</br>';
    $html = $html.'<img src="logo.png" />';
    // echo $html;
    $dompdf->loadHtml($html);
    $dompdf->render();
    $dompdf->stream("image_test.pdf", array("Attachment"=>false));
?>