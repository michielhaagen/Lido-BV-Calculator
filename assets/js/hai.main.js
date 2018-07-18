$ACTION = 'touchstart';
$(document).ready(function () 
{
    preloadAllImages();
	var colorsLoaded = 0;
	var colorsLoadedFontijn = 0;
	var colorsLoadedSpiegels = 0;
	var colorsLoadedKasten = 0;
	var colorsLoadedSpiegelkasten = 0;
	var samenstelling = "";
	console.log("READY");
	//SCREENSAVER
	$("#slick__screensaver").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        arrows: false,
        fade: true,
        infinite: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 1000,
        pauseOnHover: false           
    });

	var s_saver;
	$('body').on($ACTION, function() {
		clearTimeout(s_saver);
		s_saver = setTimeout(function(){
			$("#slick__screensaver").slick({
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        variableWidth: false,
		        arrows: false,
		        fade: true,
		        infinite: true,
		        dots: false,
		        autoplay: true,
		        autoplaySpeed: 600000, //6 mins
		        speed: 1000,
		        pauseOnHover: false           
		    });
			$(".navigation__top").hide();
			$('.screensaver').fadeIn(900);
		}, 1800000);
	
		$('.screensaver').fadeOut(900);
        $(".navigation__top").show();
	});
	//NAVIGATION
	$(".navigation__top .item").on($ACTION, function()
	{	
		$(".navigation__top .item.active").removeClass('active');
		$(this).addClass('active');
		$newActive = "." + $(this).attr('data-id');
		$(".calculator__content .steps.active").fadeOut(500).removeClass('active').fadeIn(500);
		$($newActive).addClass('active');
	});

	$(".btnSamenstelilng").on($ACTION, function()

	{
        $(".navigation__top .item.active").removeClass('active');
        $newActive = ".samenstelling";
        $(".calculator__content .steps.active").fadeOut(500).removeClass('active').fadeIn(500);
        $($newActive).addClass('active');
	});
	//SLICK CONTROLS
	$(".slider__arrow__next").on($ACTION, function()
    {
        var cls = "#" + $(this).attr('data-tag');
        var slider = $(cls);
        slider[0].slick.slickNext();
    });
    $(".slider__arrow__prev").on($ACTION, function()
    {
        var cls = "#" + $(this).attr('data-tag');
        var slider = $(cls);
        slider[0].slick.slickPrev();
    });
    $(".btnSubmit").on($ACTION, function()
    {
         $b = $(this);
        $.post($URL__LIDOAPP + '/app.php', { naam: $(".naam").val(), email: $(".email").val(), key: "HAI-APP-REQ", insert: $(".overzicht__samenstelling").html() }, function(data)
        {
            if(data == 'done')
            {
                $b.text("E-mail succesvol verzonden");
                $b.addClass('green');
               
            }
        });
    });
    $(".imageOverview div").draggable();
    $(".btnSendToMail").on($ACTION, function()
    {
        $(".mailForm").addClass('active');
    });
    $(".closeScreen").on($ACTION, function()
    {
        $(".mailForm").removeClass('active');
    });
    $(".tbl__samenstelling tr.meubel").on($ACTION, function()
    {
        $(".tbl__samenstelling tr").removeClass('highlight');
        $(this).addClass('highlight');
        $(".imageOverview div").css('z-index','1');
        $(".imageOverview .meubel").css('z-index','800');
    });
    $(".tbl__samenstelling tr.spiegel").on($ACTION, function()
    {
        $(".tbl__samenstelling tr").removeClass('highlight');
        $(this).addClass('highlight');
        $(".imageOverview div").css('z-index','1');
        $(".imageOverview .spiegel").css('z-index','800');
    });
    $(".tbl__samenstelling tr.kast").on($ACTION, function()
    {
        $(".tbl__samenstelling tr").removeClass('highlight');
        $(this).addClass('highlight');
        $(".imageOverview div").css('z-index','1');
        $(".imageOverview .kasten").css('z-index','800');
    });
    $(".tbl__samenstelling tr.kast2").on($ACTION, function()
    {
        $(".tbl__samenstelling tr").removeClass('highlight');
        $(this).addClass('highlight');
        $(".imageOverview div").css('z-index','1');
        $(".imageOverview .kasten_rechts").css('z-index','800');
    });
    //MAKE IMAGES BIG

   /* $(".makeBig").on($ACTION, function()
    {
    	$(".hoverPage").toggleClass('active');
    	$(this).parent(".vergroot").toggleClass('active');
    });*/

    //SAVE SAMENSTELLINGEN
    $(".btnAdd").on($ACTION, function()
    {
    	$data1 = $(this).attr('data-id');
    	$data2 = $(this).attr('data-tag');
    	$data3 = $(this).attr('data-type');
    	addSamenstelling($data1, $data2, $data3);
    	$b = $(this);
    	$b.text("Succesvol opgeslagen");
    	setTimeout(function(){ $b.text("Opslaan"); }, 5000);
    });
    $(".nav__step__depth").on($ACTION, function()
    {
        $(".nav__step__depth").removeClass('active');
        $depth = $(this).attr('data-id');
        $f = '.nav__depth__' + $depth;
        $($f).addClass('active');
        $p = 'depth__' + $depth;
        $(".placeholder__slider__meubels").hide();
        $(".placeholder__slider__meubels." + $p).show();
    });
    $(".reset__step1").on($ACTION, function()
    {
        $(".wastafel__voorbeeld").html('');
        $(".badmeubel__voorbeeld").html('');
        $(".step__1 .btnKiesKleur").hide();
        $(".step__1 .btnKiesBlad").hide();
        $(".placeholder__slider__meubels__materiaal").hide();
        $(".placeholder_slider__meubels__wastafel").hide();
        $(".slider__meubels").show();
        $(".slider__wastafels").html('');
        $(".slider__materiaal").html('');
        $(".step__1 .nav__step").removeClass('active');
        $(".step__1 .navstep__1").addClass('active');
        $(".step__1 .btnAdd").hide();
        $(".step__1 .nav__step__depth").removeClass('active');
        $(".step__1 .nav__depth__51").addClass('active');
        $(".placeholder__slider__meubels").hide();
        $(".placeholder__slider__meubels.depth__51").show();
    });
   
    $(".reset__step3").on($ACTION, function()
    {
        $(".kasten__voorbeeld").html('');

        $(".step__3 .btnKiesKleur").hide();

        //$(".placeholder__slider__fontijn").hide();
        $(".placeholder__slider__kasten__materiaal").hide();
        $(".placeholder__slider__kasten").show();
        $(".slider__materiaal__kasten").html('');

        $(".step__3 .nav__step").removeClass('active');
        $(".step__3 .navstep__1").addClass('active');
        $(".step__3 .btnAdd").hide();
    });
    $(".reset__step4").on($ACTION, function()
    {
        $(".spiegelkasten__voorbeeld").html('');

        $(".step__4 .btnKiesKleur").hide();

        //$(".placeholder__slider__fontijn").hide();
        $(".placeholder__slider__spiegelkasten__materiaal").hide();
        $(".placeholder__slider__spiegelkasten").show();
        $(".slider__materiaal__spiegelkasten").html('');

        $(".step__4 .nav__step").removeClass('active');
        $(".step__4 .navstep__1").addClass('active');
        $(".step__4 .btnAdd").hide();
    });
    $(".reset__step5").on($ACTION, function()
    {
        $(".spiegel__voorbeeld").html('');

        $(".step__5 .btnKiesAfmeting").hide();

        //$(".placeholder__slider__fontijn").hide();
        $(".placeholder__slider__spiegel__afmeting").hide();
        $(".placeholder__slider__spiegel").show();
        $(".slider__spiegel__afmeting").html('');

        $(".step__5 .nav__step").removeClass('active');
        $(".step__5 .navstep__1").addClass('active');
        $(".step__5 .btnAdd").hide();
    });

    $(".resetAll").on($ACTION, function()
    {
        $(".calculator__content .steps.active").fadeOut(500).removeClass('active');

        $(".imageOverview .meubel, .imageOverview .spiegel, .imageOverview .fontein, .imageOverview .kast, .imageOverview .spiegelkast").html("");
        $("tr.meubel, tr.spiegel, tr.fontein, tr.kast, tr.spiegelkast").html("<tr><td></td><td></td><td></td></tr>");

        $(".spiegel__voorbeeld").html('');

        $(".step__5 .btnKiesAfmeting").hide();

        //$(".placeholder__slider__fontijn").hide();
        $(".placeholder__slider__spiegel__afmeting").hide();
        $(".placeholder__slider__spiegel").show();
        $(".slider__spiegel__afmeting").html('');

        $(".step__5 .nav__step").removeClass('active');
        $(".step__5 .navstep__1").addClass('active');
        $(".step__5 .btnAdd").hide();

         $(".spiegelkasten__voorbeeld").html('');

        $(".step__4 .btnKiesKleur").hide();

        //$(".placeholder__slider__fontijn").hide();
        $(".placeholder__slider__spiegelkasten__materiaal").hide();
        $(".placeholder__slider__spiegelkasten").show();
        $(".slider__materiaal__spiegelkasten").html('');

        $(".step__4 .nav__step").removeClass('active');
        $(".step__4 .navstep__1").addClass('active');
        $(".step__4 .btnAdd").hide();

         $(".kasten__voorbeeld").html('');

        $(".step__3 .btnKiesKleur").hide();

        //$(".placeholder__slider__fontijn").hide();
        $(".placeholder__slider__kasten__materiaal").hide();
        $(".placeholder__slider__kasten").show();
        $(".slider__materiaal__kasten").html('');

        $(".step__3 .nav__step").removeClass('active');
        $(".step__3 .navstep__1").addClass('active');
        $(".step__3 .btnAdd").hide();


        $(".fontijn__voorbeeld").html('');

        $(".step__2 .btnKiesKleur").hide();

        //$(".placeholder__slider__fontijn").hide();
        $(".placeholder__slider__fontijntje__materiaal").hide();
        $(".placeholder__slider__fontijn").show();
        $(".slider__materiaal__fontijntje").html('');

        $(".step__2 .nav__step").removeClass('active');
        $(".step__2 .navstep__1").addClass('active');
        $(".step__2 .btnAdd").hide();


        $(".wastafel__voorbeeld").html('');
        $(".badmeubel__voorbeeld").html('');
        $(".step__1 .btnKiesKleur").hide();
        $(".step__1 .btnKiesBlad").hide();
        $(".placeholder__slider__meubels__materiaal").hide();
        $(".placeholder_slider__meubels__wastafel").hide();
        $(".slider__meubels").show();
        $(".slider__wastafels").html('');
        $(".slider__materiaal").html('');
        $(".step__1 .nav__step").removeClass('active');
        $(".step__1 .navstep__1").addClass('active');
        $(".step__1 .btnAdd").hide();
        $(".step__1 .nav__step__depth").removeClass('active');
        $(".step__1 .nav__depth__51").addClass('active');
        $(".placeholder__slider__meubels").hide();
        $(".placeholder__slider__meubels.depth__51").show();
      

        $(".navigation__top .item.active").removeClass('active');
       
        $newActive = ".calculator__content .step__1";
        $($newActive).fadeIn(500);
        $($newActive).addClass('active');


    });

	//STEP 1 MEUBELS
	$("#slider__meubels__40, #slider__meubels__45, #slider__meubels__51").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        fade: false,
        infinite: false,
        centerMode: false,
        dots: false,
        autoplay: false
    });
	$meubelsID = 0;
	$meubelsDataNames = '';
    $(".slider__meubels .item").on($ACTION, function()
	{

		$(".step__1 .btnKiesKleur").show();
        $(".wastafel__voorbeeld").html('');
        $(".slider__meubels .item").removeClass('selected');
        $(".slider__wastafels .item").removeClass('selected');
        $(this).addClass('selected');
        $(".badmeubel__voorbeeld").html('<img class="badmeubel" src="' + $(this).attr('data-item') + '">')
		$meubelsID = $(this).attr('data-id');
        $meubelsDataNames = $(this).attr('data-names');
	});

	$(".step__1 .btnKiesKleur").on($ACTION, function()
	{
        $(this).hide();
        $(".slider__meubels").hide();
        $(".step__1 .nav__step").removeClass('active');
        $(".step__1 .navstep__2").addClass('active');
        //loadWastafels($(this).attr('data-id'), $(this).attr('data-names'));
        loadColors($meubelsID, $meubelsDataNames, colorsLoaded);
        colorsLoaded = 1;
	});


  


	//STEP 3 KASTEN
	$("#slider__kasten").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        fade: false,
        infinite: false,
        centerMode: false,
        dots: false,
        autoplay: false
    });

	$kastenIDs = '';
	$kastenNames = '';
    $(".slider__kasten .item").on($ACTION, function()
	{
		$(".kasten__voorbeeld").html('');
		$(".step__3 .btnKiesKleur").show();
		$(".slider__kasten .item").removeClass('selected');
		$//(".slider__wastafels .item").removeClass('selected');
		$(this).addClass('selected');
		$(".kasten__voorbeeld").html('<img class="badmeubel" src="' + $(this).attr('data-item') + '">')
		//loadWastafels($(this).attr('data-id'), $(this).attr('data-names'));
        $kastenIDs = $(this).attr('data-id');
		$kastenNames = $(this).attr('data-names');

	});
    $(".step__3 .btnKiesKleur").on($ACTION, function()
	{
        $(this).hide();
		$(".placeholder__slider__kasten").hide();
        $(".step__3 .nav__step").removeClass('active');
        $(".step__3 .navstep__2").addClass('active');
        loadColorsKasten($kastenIDs, $kastenNames, colorsLoadedKasten);
        colorsLoadedKasten = 1;
	});


    //STEP 4 SPIEGELKASTEN
	$("#slider__spiegelkasten").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        fade: false,
        infinite: false,
        centerMode: false,
        dots: false,
        autoplay: false
    });

	$spiegelkastenIDs = '';
	$spiegelkastenNames = '';
    $(".slider__spiegelkasten .item").on($ACTION, function()
	{
		$(".spiegelkasten__voorbeeld").html('');
		$(".step__4 .btnKiesKleur").show();
		$(".slider__spiegelkasten .item").removeClass('selected');
		$//(".slider__wastafels .item").removeClass('selected');
		$(this).addClass('selected');
		$(".spiegelkasten__voorbeeld").html('<img class="badmeubel" src="' + $(this).attr('data-item') + '">')
		//loadWastafels($(this).attr('data-id'), $(this).attr('data-names'));
        $spiegelkastenIDs = $(this).attr('data-id');
		$spiegelkastenNames = $(this).attr('data-names');

	});
    $(".step__4 .btnKiesKleur").on($ACTION, function()
	{
        $(this).hide();
		$(".placeholder__slider__spiegelkasten").hide();
        $(".step__4 .nav__step").removeClass('active');
        $(".step__4 .navstep__2").addClass('active');
        loadColorsSpiegelkasten($spiegelkastenIDs, $spiegelkastenNames, colorsLoadedSpiegelkasten);
        colorsLoadedSpiegelkasten = 1;
	});

    //STEP 5 spiegels
	$("#slider__spiegel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        fade: false,
        infinite: false,
        centerMode: false,
        dots: false,
        autoplay: false
    });
	$spiegelIDs = '';
	$spiegelNames = '';
    $(".slider__spiegel .item").on($ACTION, function()
	{
		$("#btn__5").hide();

		$(".spiegel__voorbeeld").html('');
        $(".step__5 .btnKiesAfmeting").show();
		$(".slider__spiegel .item").removeClass('selected');
		$//(".slider__wastafels .item").removeClass('selected');
		$(this).addClass('selected');
		$(".spiegel__voorbeeld").html('<img class="badmeubel" src="' + $(this).attr('data-item') + '">')
		//loadWastafels($(this).attr('data-id'), $(this).attr('data-names'));
        $spiegelIDs = $(this).attr('data-id');
        $spiegelNames = $(this).attr('data-names');


	});
	$(".step__5 .btnKiesAfmeting").on($ACTION, function()
	{
        $(this).hide();
		$(".placeholder__slider__spiegel").hide();
        $(".step__5 .nav__step").removeClass('active');
        $(".step__5 .navstep__2").addClass('active');
        loadColorsSpiegels($spiegelIDs, $spiegelNames, colorsLoadedSpiegels);
        colorsLoadedSpiegels = 1;
	})

	
});

$step1_sm_dataRange = '';
$step1_sm_dataDescr = '';
$(document).on($ACTION,".step__1 .slider__materiaal .item", function()
{
    $(".step__1 .btnKiesKleur").hide();
    $(".step__1 .btnKiesBlad").show();
    $(".wastafel__voorbeeld").html('');
    $(".slider__materiaal .item").removeClass('selected');
    $(this).addClass('selected');
    $("#btn__1").hide();
    $id = $(this).attr('data-range').split("{}");
    $color = $(this).attr('data-color');
    //console.log($var);
    $step1_sm_dataDescr = $(this).attr('data-description');
    $step1_sm_dataRange = $(this).attr('data-range');

    $(".badmeubel__voorbeeld").html('<img class="badmeubel" src="assets/img/badmeubel/meubels-colored/' + $color  + '/' + $id[0]  + '.png">')
    //$(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')
    //loadColors($(this).attr('data-artikel'));

});
$(document).on($ACTION, ".step__1 .btnKiesBlad", function()
{
    $(this).hide();
    $(".step__1 .nav__step").removeClass('active');
    $(".step__1 .navstep__3").addClass('active');
	$(".placeholder__slider__meubels__materiaal").hide();
    loadWastafels($step1_sm_dataRange, $step1_sm_dataDescr);
});

/*
$(".step__1 .btnKiesKleur").show();
        $(".wastafel__voorbeeld").html('');
        $(".slider__meubels .item").removeClass('selected');
        $(".slider__wastafels .item").removeClass('selected');
        $(this).addClass('selected');
        $(".badmeubel__voorbeeld").html('<img class="badmeubel" src="' + $(this).attr('data-item') + '">')
		$meubelsID = $(this).attr('data-id');
        $meubelsDataNames = $(this).attr('data-names');
 */




$(document).on($ACTION,".slider__wastafels .item", function()
{
    $(".wastafel__voorbeeld").html('');
    $(".step__1 .btnKiesBlad").hide();
    $("#btn__2").hide();
    $(".slider__wastafels .item").removeClass('selected');
    $(this).addClass('selected');

    $(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')

    $id = $(this).attr('data-artikel');
    $color = $(".slider__materiaal .item.selected").attr('data-color');
    $dataID = $id + '.' + $color;
    $data2 = $(".badmeubel__voorbeeld").html() + "{}" + $(".wastafel__voorbeeld").html();
    $("#btn__1").attr('data-id',$dataID).attr('data-tag', $data2).attr('data-type','meubel').fadeIn(300);
    //loadColors($(this).attr('data-artikel'));
    //loadWastafels($(this).attr('data-id'));
});

function addSamenstelling($data1, $data2, $type)
{
	if($type == 'meubel')
	{
		$ex = $data2.split("{}");
		$(".imageOverview .meubel").html($ex[0] + $ex[1]);
        $split = $data1.split(".");
        $omschrijving = '';
        $artikelnummer = '';
        $prijs = '';
        $kleur = '';
        for($i=0;$i<$priceProductTable.length;$i++)
        {
            if($split[0] == $priceProductTable[$i][0])
            {
                $omschrijving = $priceProductTable[$i][2];
                $prijs = parseFloat($priceProductTable[$i][1]);
                $artikelnummer = $priceProductTable[$i][0];
                console.log($priceProductTable[$i][0]);
                console.log($priceProductTable[$i][1]);
                console.log($priceProductTable[$i][2]);
                break;
            }
        }

        for($i=0;$i<$array_colors.length;$i++)
        {
            if($split[1] == $array_colors[$i])
            {
                $kleur = $array_colors_names[$i];
                break;
            }
        }
        
        //$omschrijving = $priceProductTable.indexOf($split[0]);
        //$kleur = $split[1];
        $("tr.meubel").html("<td>" + $artikelnummer + "</td><td>" + $omschrijving + "</td><td>" + $kleur + "</td><td>&euro; "+ $prijs +"</td>")
	
	}
	else if($type == 'spiegel')
	{
		$(".imageOverview .spiegel").html($data2);

        $split = $data1.split(".");
        $omschrijving = '';
        $artikelnummer = '';
        $prijs = '';
        $kleur = '';
        for($i=0;$i<$priceProductTable.length;$i++)
        {
            if($split[0] == $priceProductTable[$i][0])
            {
                $omschrijving = $priceProductTable[$i][2];
                $prijs = parseFloat($priceProductTable[$i][1]);
                $artikelnummer = $priceProductTable[$i][0];
                console.log($priceProductTable[$i][0]);
                console.log($priceProductTable[$i][1]);
                console.log($priceProductTable[$i][2]);
                break;
            }
        }


        $("tr.spiegel").html("<td>" + $artikelnummer + "</td><td>" + $omschrijving + "</td><td>" + $kleur + "</td><td>&euro; "+ $prijs +"</td>")
	}
	
    else if($type == 'kasten')
    {

        //IF Exists LH.png >> links, else RECHTs
        if ($data2.indexOf("RH.png") >= 0)
        {
            $(".imageOverview .kasten_rechts").html($data2);
        }
        else
        {
            $(".imageOverview .kasten").html($data2);    
        }
        

        $split = $data1.split(".");
        $omschrijving = '';
        $artikelnummer = '';
        $prijs = '';
        $kleur = '';
        for($i=0;$i<$priceProductTable.length;$i++)
        {
            if($split[0] == $priceProductTable[$i][0])
            {
                $omschrijving = $priceProductTable[$i][2];
                $prijs = parseFloat($priceProductTable[$i][1]);
                $artikelnummer = $priceProductTable[$i][0];
                console.log($priceProductTable[$i][0]);
                console.log($priceProductTable[$i][1]);
                console.log($priceProductTable[$i][2]);
                break;
            }
        }

        for($i=0;$i<$array_colors.length;$i++)
        {
            if($split[1] == $array_colors[$i])
            {
                $kleur = $array_colors_names[$i];
                break;
            }
        }
        
        if ($data2.indexOf("RH.png") >= 0)
        {
            $("tr.kast2").html("<td>" + $artikelnummer + "</td><td>" + $omschrijving + "</td><td>"+$kleur+"</td><td>&euro; "+ $prijs +"</td>")
        }
        else
        {
            $("tr.kast").html("<td>" + $artikelnummer + "</td><td>" + $omschrijving + "</td><td>"+$kleur+"</td><td>&euro; "+ $prijs +"</td>")
        }

        
    }
    else if($type == 'spiegelkasten')
    {
        $(".imageOverview .spiegel").html($data2);

        $split = $data1.split(".");
        $omschrijving = '';
        $artikelnummer = '';
        $prijs = '';
        $kleur = '';
        for($i=0;$i<$priceProductTable.length;$i++)
        {
            if($split[0] == $priceProductTable[$i][0])
            {
                $omschrijving = $priceProductTable[$i][2];
                $prijs = parseFloat($priceProductTable[$i][1]);
                $artikelnummer = $priceProductTable[$i][0];
                console.log($priceProductTable[$i][0]);
                console.log($priceProductTable[$i][1]);
                console.log($priceProductTable[$i][2]);
                break;
            }
        }

        for($i=0;$i<$array_colors.length;$i++)
        {
            if($split[1] == $array_colors[$i])
            {
                $kleur = $array_colors_names[$i];
                break;
            }
        }
         
        $("tr.spiegel").html("<td>" + $artikelnummer + "</td><td>" + $omschrijving + "</td><td>"+$kleur+"</td><td>&euro; "+ $prijs +"</td>")

       
    }
	else
	{
		$img = "<div class=\"overig\">" + $data2 + "</div>";
		$(".imageOverview .overig").html($img);
	}
	
	
	

	
	return true;	
}
/*$(document).on($ACTION,".slider__spiegel .item", function()
{
	$(".fontijn__voorbeeld").html('');
	$(".spiegel__voorbeeld .item").removeClass('selected');
	$(this).addClass('selected');
	$id = $(this).attr('data-range').split("{}");
	$color = $(this).attr('data-color');
	//console.log($var);
	$(".spiegel__voorbeeld").html('<img class="badmeubel" src="assets/img/spiegels/' + $id[0]  + '.png">')
	//$(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')
	//loadColors($(this).attr('data-artikel'));		
	//loadWastafels($(this).attr('data-range'), $(this).attr('data-description'));
});*/
$(document).on($ACTION,".slider__materiaal__fontijntje .item", function()
{
	$(".fontijn__voorbeeld").html('');
	$(".step__2 .btnKiesKleur").hide();
	$(".slider__materiaal__fontijntje .item").removeClass('selected');
	$(this).addClass('selected');
	$id = $(this).attr('data-range').split("{}");
	$color = $(this).attr('data-color');
	//console.log($var);

	
	$artikel = $(".slider__fontijn .item.selected").attr('data-id');
	$dataID = $artikel + '.' + $color;
	$("#btn__2").attr('data-id',$dataID).attr('data-tag','<img src="assets/img/fontijntje/meubels-colored/' + $color  + '/' + $id[0]  + '.png">').attr('data-type', 'fontein').fadeIn(300);

	$(".fontijn__voorbeeld").html('<img class="badmeubel" src="assets/img/fontijntje/meubels-colored/' + $color  + '/' + $id[0]  + '.png">')
	//$(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')
	//loadColors($(this).attr('data-artikel'));		
	//loadWastafels($(this).attr('data-range'), $(this).attr('data-description'));
});
$(document).on($ACTION,".slider__materiaal__kasten .item", function()
{
	$(".kasten__voorbeeld").html('');
	$(".step__3 .btnKiesKleur").hide();
	$(".slider__materiaal__kasten .item").removeClass('selected');
	$(this).addClass('selected');
	$id = $(this).attr('data-range').split("{}");
	$color = $(this).attr('data-color');
	//console.log($var);

	
	$artikel = $(".slider__kasten .item.selected").attr('data-id');
	$dataID = $artikel + '.' + $color;
	$("#btn__3").attr('data-id',$dataID).attr('data-tag','<img src="assets/img/kasten/meubels-colored/' + $color  + '/' + $id[0]  + '.png">').attr('data-type', 'kasten').fadeIn(300);

	$(".kasten__voorbeeld").html('<img class="badmeubel" src="assets/img/kasten/meubels-colored/' + $color  + '/' + $id[0]  + '.png">')
	//$(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')
	//loadColors($(this).attr('data-artikel'));		
	//loadWastafels($(this).attr('data-range'), $(this).attr('data-description'));
});
$(document).on($ACTION,".slider__materiaal__spiegelkasten .item", function()
{
    $(".kasten__voorbeeld").html('');
    $(".step__4 .btnKiesKleur").hide();
    $(".slider__materiaal__spiegelkasten .item").removeClass('selected');
    $(this).addClass('selected');
    $id = $(this).attr('data-range').split("{}");
    $color = $(this).attr('data-color');
    //console.log($var);

    
    $artikel = $(".slider__spiegelkasten .item.selected").attr('data-id');
    $dataID = $artikel + '.' + $color;
    $("#btn__4").attr('data-id',$dataID).attr('data-tag','<img src="assets/img/spiegelkasten/meubels-colored/' + $color  + '/' + $id[0]  + '.png">').attr('data-type', 'spiegelkasten').fadeIn(300);

    $(".spiegelkasten__voorbeeld").html('<img class="badmeubel" src="assets/img/spiegelkasten/meubels-colored/' + $color  + '/' + $id[0]  + '.png">')
    //$(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')
    //loadColors($(this).attr('data-artikel'));     
    //loadWastafels($(this).attr('data-range'), $(this).attr('data-description'));
});
$(document).on($ACTION,".slider__spiegel__afmeting .item", function()
{
	$(".spiegel__voorbeeld").html('');
	$(".step__5 .btnKiesAfmeting").hide();
	$(".slider__spiegel__afmeting .item").removeClass('selected');
	$(this).addClass('selected');
	$id = $(this).attr('data-id');
	$("#btn__5").attr('data-id',$id).attr('data-tag', '<img class="badmeubel" src="assets/img/spiegels/' + $id  + '.png">').attr('data-type', 'spiegel').fadeIn(300);
	//console.log($var);
	$(".spiegel__voorbeeld").html('<img class="badmeubel" src="assets/img/spiegels/' + $id  + '.png">')
	//$(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')
	//loadColors($(this).attr('data-artikel'));		
	//loadWastafels($(this).attr('data-range'), $(this).attr('data-description'));
});


function loadColors($range, $description, $colorsLoaded)
{
	
	//$(".placeholder_slider__meubels__wastafel").fadeOut(500);
	$('.placeholder__slider__meubels__materiaal').fadeOut(0, function()
	{
		

		if($colorsLoaded == 1)
		{
			console.log("UNSET");
			$("#slider__materiaal").slick("unslick");
			$('#slider__materiaal').html('');
		}
		for(i=0;i<$array_colors.length;i++)
		{
			$("#slider__materiaal").append('<div class="item" data-color="' + $array_colors[i] + '" data-range="'+$range + '"  data-description="'+$description + '"><img src="assets/img/badmeubel/colors/' + $array_colors[i] + '.jpg"><p class="txt">' + $array_colors_names[i] + '</p></div>');
		}
		$("#slider__materiaal").slick({
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        variableWidth: true,
	        arrows: false,
	        fade: false,
	        infinite: false,
	        centerMode: false,
	        dots: false,
	        autoplay: false
	    });
	});
	$('.placeholder__slider__meubels__materiaal').fadeIn(500);
}

function loadColorsKasten($range, $description, $colorsLoaded)
{
	
	//$(".placeholder_slider__meubels__wastafel").fadeOut(500);
	$(".step__3 .nav__step").removeClass('active');
	$(".step__3 .navstep__2").addClass('active');
	$('.placeholder__slider__kasten__materiaal').fadeOut(0, function()
	{
		if($colorsLoaded == 1)
		{
			console.log("UNSET");
			$("#slider__materiaal__kasten").slick("unslick");
			$('#slider__materiaal__kasten').html('');
		}
		for(i=0;i<$array_colors.length;i++)
		{
			$("#slider__materiaal__kasten").append('<div class="item" data-color="' + $array_colors[i] + '" data-range="'+$range + '"  data-description="'+$description + '"><img src="assets/img/kasten/colors/' + $array_colors[i] + '.jpg"><p class="txt">' + $array_colors_names[i] + '</p></div>');
		}
		$("#slider__materiaal__kasten").slick({
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        variableWidth: true,
	        arrows: false,
	        fade: false,
	        infinite: false,
	        centerMode: false,
	        dots: false,
	        autoplay: false
	    });
	});
	$('.placeholder__slider__kasten__materiaal').fadeIn(500);
}
function loadColorsSpiegelkasten($range, $description, $colorsLoaded)
{
	
	//$(".placeholder_slider__meubels__wastafel").fadeOut(500);
	$(".step__4 .nav__step").removeClass('active');
	$(".step__4 .navstep__2").addClass('active');
	$('.placeholder__slider__spiegelkasten__materiaal').fadeOut(0, function()
	{
		if($colorsLoaded == 1)
		{
			console.log("UNSET");
			$("#slider__materiaal__spiegelkasten").slick("unslick");
			$('#slider__materiaal__spiegelkasten').html('');
		}
		for(i=0;i<$array_colors.length;i++)
		{
			$("#slider__materiaal__spiegelkasten").append('<div class="item" data-color="' + $array_colors[i] + '" data-range="'+$range + '"  data-description="'+$description + '"><img src="assets/img/spiegelkasten/colors/' + $array_colors[i] + '.jpg"><p class="txt">' + $array_colors_names[i] + '</p></div>');
		}
		$("#slider__materiaal__spiegelkasten").slick({
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        variableWidth: true,
	        arrows: false,
	        fade: false,
	        infinite: false,
	        centerMode: false,
	        dots: false,
	        autoplay: false
	    });
	});
	$('.placeholder__slider__spiegelkasten__materiaal').fadeIn(500);
}
function loadColorsSpiegels($ids, $description, $colorsLoaded)
{
	
	//$(".placeholder_slider__meubels__wastafel").fadeOut(500);
    $(".step__5 .nav__step").removeClass('active');
    $(".step__5 .navstep__2").addClass('active');
	$('.placeholder__slider__spiegel__afmeting').fadeOut(0, function()
	{
		$ids = $ids.split("{}");
		$names = $description.split("{}");
		if($colorsLoaded == 1)
		{
			console.log("UNSET");
			$("#slider__spiegel__afmeting").slick("unslick");
			$('#slider__spiegel__afmeting').html('');
		}
		for(i=0;i<$ids.length;i++)
		{
			$("#slider__spiegel__afmeting").append('<div class="item" data-id="'+$ids[i] + '"  data-description="'+$names[i] + '"><img src="assets/img/spiegels/' + $ids[i] + '.png"><p class="txt">' + $names[i] + '</p></div>');
		}
		$("#slider__spiegel__afmeting").slick({
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        variableWidth: true,
	        arrows: false,
	        fade: false,
	        infinite: false,
	        centerMode: false,
	        dots: false,
	        autoplay: false
	    });
	});
	$('.placeholder__slider__spiegel__afmeting').fadeIn(500);
}
function loadWastafels($range, $description)
{
	$('.placeholder_slider__meubels__wastafel').fadeOut(0, function()
	{
		$(".slider__wastafels").html('');
		$split = $range.split("{}");
		$splitDescr = $description.split("{}");
		for(i=0;i<$split.length;i++)
		{
			//console.log($split[i]);
			$(".slider__wastafels").append('<div class="item" data-artikel="'+$split[i]+'" data-item="assets/img/badmeubel/wastafels-cropped/' + $split[i] + '.png"><img src="assets/img/badmeubel/wastafels/' + $split[i] + '.png"><p class="txt">' + $splitDescr[i] + '</p></div>');
		}	
    	$('.placeholder_slider__meubels__wastafel').fadeIn(500);
    });
}

function preloadAllImages()
{
    //COLORS 
    //$(".cacheImage").hide();
    console.log("WAITING WHILE PRELOADING");
    $aColors = ['150X','152X','160X','161X','170X','172X','174X','175X','176X','177X','178X','179X','180X'];
    $aMeubels = ['MM11001','MM11004','MM11007','MM11010','MM11013','MM21001','MM21004','MM21007','MM31004','MM31007'];


    $aWastafels = ['MM11001','MM11002','MM11003','MM11004','MM11005','MM11006','MM11007','MM11008','MM11009','MM11010','MM11011','MM11012','MM11013','MM11014','MM11015','MM21001','MM21002','MM22004','MM21005','MM21007','MM31004','MM31007'];


    $aKasten = ['CP621LH','CP621RH','CP622LR','CP622RH'];

    $aSpiegelkasten = ['SC004L','SC008L','SC1010L','SC012L','SC014L'];

    $aSpiegels = ['SP0080','SP0100','SP0120','SP1080','SP1100','SP1120','SP1140','SP2080','SP2100','SP2120','SP2140','SP3080','SP3100','SP3120','SP3140','SP4080','SP4100','SP4120','SP4140','SP5080','SP5100','SP5120','SP5140','SP6080','SP6100','SP6120','SP6140','SP7080','SP7100','SP7120','SP7140'];
    

    $($aMeubels).each(function(){
        var localSRC = this;
        var src = 'assets/img/badmeubel/meubels/' + localSRC + '.png';
        preloadImage(src);

    });

    $($aWastafels).each(function(){
        var localSRC = this;
        var src = 'assets/img/badmeubel/wastafels/' + localSRC + '.png';
        preloadImage(src);

         var localSRC = this;
        var src = 'assets/img/badmeubel/wastafels-cropped/' + localSRC + '.png';
        preloadImage(src);

    });



    $($aKasten).each(function(){
        var localSRC = this;
        var src = 'assets/img/kasten/meubels/' + localSRC + '.png';
        preloadImage(src);

    });

    $($aSpiegelkasten).each(function(){
        var localSRC = this;
        var src = 'assets/img/spiegelkasten/meubels/' + localSRC + '.png';
        preloadImage(src);

    });

    $($aSpiegels).each(function(){
        var localSRC = this;
        var src = 'assets/img/spiegels/' + localSRC + '.png';
        preloadImage(src);

    });

    //sreensaver 1 - 16
    for($i=0;$i<=16;$i++)
    {
        var src = 'assets/img/screensaver/' + $i + '.jpg';
        preloadImage(src);
    }


    //Alle gekleurde items

    $($aColors).each(function(){
        console.log("ACCESS COLOR MODULE");
        var localColor = this;
        var src = 'assets/img/badmeubel/colors/' + localColor + '.jpg';
        preloadImage(src);


        $($aMeubels).each(function(){
            var localMeubel = this;
            var src = 'assets/img/badmeubel/meubels-colored/' + localColor + '/' + localMeubel + '.png';
            preloadImage(src);
        });


        $($aKasten).each(function(){
            var localKasten = this;
            var src = 'assets/img/kasten/meubels-colored/' + localColor + '/' + localKasten + '.png';
            preloadImage(src);
        });

        $($aSpiegelkasten).each(function(){
            var localSpiegelkasten = this;
            var src = 'assets/img/spiegelkasten/meubels-colored/' + localColor + '/' + localSpiegelkasten + '.png';
            preloadImage(src);
        });
    });
    console.log("DONE PRELOADING");
    setTimeout(function(){ $(".loading").fadeOut(500) }, 2000);
}
function preloadImage($image)
{
    $('.cacheImage').attr('src',$image);
    console.log("PRELOAD: " + $image);
}

