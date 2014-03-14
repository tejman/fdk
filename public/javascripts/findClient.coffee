$ ->

  ###
  ************** Function Definitions ***********
  ###

  getSearch = (input)->
    $.ajax {
      type: "GET",
      url: "/search",
      data: {input: input},
      success: (data)->
        # Clear existing DOM elemnts
        $("#search-results").empty()
        $("#search-filters").empty()
        $("#query-menu").empty()

        # Render query menu
        jade.render $("#query-menu")[0], "queryMenu", {label: "Showing Results For:", value: data.query}

        # Render filter elements
        jade.render $("#search-filters")[0], "filterBar"
        updateWidgets()
        for elem in $(".slider-stat .ui-slider-segment:first-child")
          $(elem).css "margin-left", "0"

        # Render search results
        jade.render $("#search-results")[0], "results", data
    }

  updateWidgets = ()->

    $slider = $(".slider-stat")
    if ($slider.length)
      $slider.slider({
        animate: "fast",
        min: 0,
        max: 100,
        value: [10,90]
        orientation: "horizontal",
        range: true,
        step: 10
      })
      .addSliderSegments($slider.slider("option").max)


  ###
  **************** AJAX Calls ********************
  ###

  $.ajax {
    type: "GET",
    url: "/popRandomSchools",
    success: (data)->
      jade.render $("#search-results")[0], "results", data
  }

  $.ajax {
    type: "GET",
    url: "/popStateDropdown",
    success: (data)->
      for obj in data
        newElem = _.template("<option value='<%= stateAbbr %>'><%= stateFull %></option>")
        $("#browse-state").append(newElem(obj))
  }


  ###
  **************** Event Handlers ********************
  ###

  $("#search-button").on "click", ()->
    getSearch $("#search-bar").val()


  $("#search-bar").on "keypress", (e)->
    if e.keyCode is 13
      getSearch $(this).val()


    

  $(document).on "click", ".result-item", ()->
    console.log "test"
    window.location.replace("/schoolProfile/"+$(this).attr("data-id"))

  $(document).on "click", "#filter-button", ()->
    $("#search-filters").slideToggle({
      done: ()->
        $("#search-filters").css "overflow", "visible"
      })
    $(".filter-actions").fadeToggle()


