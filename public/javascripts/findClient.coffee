$ ->

  ###
  ************** Function Definitions ***********
  ###
  searchResults = []
  searchQuery = new String
  currentlyFiltered = searchResults

  getSearch = (input)->
    input = if input then input else "{All}"
    searchQuery = input

    $.ajax {
      type: "GET",
      url: "/search",
      data: {input: input},
      success: (data)->
        console.log data
        searchResults = data.schools
        # Clear existing DOM elemnts
        
        $("#search-filters").empty()
        $("#query-menu").empty()

        # Render query menu
        jade.render $("#query-menu")[0], "queryMenu", {label: "Showing Results For:", value: searchQuery}
        $("#filter-button").tooltip()
        $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch()

        # Render filter elements
        jade.render $("#search-filters")[0], "filterBar"
        initWidgets()
        initFilters()
        for elem in $(".slider-stat .ui-slider-segment:first-child")
          $(elem).css "margin-left", "0"

        $("#search-filters input").prop('disabled', true);
        filterResults(searchResults, getFilterValues())
    }

  renderSearchResults = (finalResults, pageNum)->
    # Render search results
    if finalResults.length>10 && !pageNum
      renderPagination(finalResults)
      pageResults = finalResults.slice(0,10) 
    else
      if pageNum
        end = pageNum * 10
        start = end - 10
        pageResults = finalResults.slice(start, end)
        $("html, body").animate { scrollTop: 0 }, "slow", "swing"
      else
        pageResults = finalResults

    $("#search-results").empty()
    jade.render $("#search-results")[0], "results", {schools: pageResults}
    newPageNum = if pageNum then pageNum else 1
    $("#search-results").attr("data-page", newPageNum)
    $(".pager").find("input").val($("#search-results").attr("data-page"))

  renderPagination = (finalResults)->
    totalPages = Math.ceil(finalResults.length/10)
    $pagination = $("#pagination")

    $pagination.empty()
    jade.render $pagination[0], "pagination", {pages: totalPages}
    setSize = $pagination.find("input").val().length

    setWidth = $pagination.find(".totalPages").css("width")
    $pagination.find("input").attr("size", setSize)
    $pagination.find(".previous a").css("border-right", $pagination.find(".next a").css("border-left"))
    # $pagination.css({left: (($(window).width()/2)-(parseInt($pagination.css("width"))/2)).toString()+"px"})

    # $pagination.css({top: $("#search-results").parent().offset().top})
  initWidgets = ()->

    $slider = $(".slider-stat")
    if ($slider.length)
      $slider.slider({
        animate: "fast",
        min: 0,
        max: 100,
        values: [10,90]
        orientation: "horizontal",
        range: true,
        step: 10,
        stop: (e, ui)->
          filterItem = $(this).closest(".filter-item")
          setTimeout(()-> 
            filterItem.find(".label-value").removeClass("hovered")
          ,500)
          filterResults(searchResults, getFilterValues())

        ,slide: (e, ui)->

          handleIndex = $(ui.handle).data("ui-slider-handle-index")
          rangeValue = if handleIndex is 1 then "max" else "min"

          filterItem = $(this).closest(".filter-item")
          updateFilterLabel(filterItem, rangeValue, ui.value)
          filterItem.find(".value-"+rangeValue).addClass("hovered")

      })
      .addSliderSegments($slider.slider("option").max)

  updateFilterLabel = (filterItem, rangeValue, newValue)->
    input = filterItem.find("input.value-"+rangeValue)
    format = filterItem.attr("data-num-format")

    if format is "int" then prettyValue = newValue
    if format is "percent" then prettyValue = newValue+"%"
    if format is "currency"
      prettyValue = "$"+newValue.toString().split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1,').split('').reverse().join('')

    $(input).val(prettyValue)

    $(input).attr("size", $(input).val().length)

  initFilters = ()->
    $slider = $(".slider-stat")
    filterAttrs = $slider.map (ind, item)->
      {name: $(item).closest(".filter-item").attr("data-statname")}

    filterRanges = filterAttrs.map (ind, filterItem)->
      initFilterValues(filterItem)
    console.log filterRanges

    for slideElem in $slider
      resetFilterItem(slideElem, filterRanges)

    ###
    {END} initFilters
    ### 

  initFilterValues = (filterItem)->

    objectLevel = 1

    maxItem = _.max searchResults, (searchResult)->
      if searchResult[filterItem.name]
        objectLevel = 1
        if filterItem.name is "grades"
          +searchResult[filterItem.name]["high"]
        else
          +searchResult[filterItem.name]
      else if searchResult.zipProfile[filterItem.name]
        objectLevel = 2
        +searchResult.zipProfile[filterItem.name]
      else
        null

    minItem = _.min searchResults, (searchResult)->
      if searchResult[filterItem.name]
        objectLevel = 1
        if filterItem.name is "grades"
          +searchResult[filterItem.name]["low"]
        else
          +searchResult[filterItem.name]
      else if searchResult.zipProfile[filterItem.name]
        objectLevel = 2
        +searchResult.zipProfile[filterItem.name]
      else
        Infinity

    if objectLevel is 1
      filterItem.max = if isNaN(+maxItem[filterItem.name]) then +maxItem[filterItem.name]["high"] else +maxItem[filterItem.name]
      filterItem.min = if isNaN(+minItem[filterItem.name]) then +minItem[filterItem.name]["low"] else +minItem[filterItem.name]
      filterItem
    else
      filterItem.max = +maxItem.zipProfile[filterItem.name]
      filterItem.min = +minItem.zipProfile[filterItem.name]
      filterItem

    ###
    {END} resetFilterItem
    ###

  resetFilterItem = (slideElem, filterRanges)->
    range = _.where filterRanges, {name: $(slideElem).closest(".filter-item").attr("data-statname")}
    range = range[0]
    parentElem = $(slideElem).closest(".filter-item")
    stepValue = parseFloat(parentElem.attr("data-step-value"))
    $(slideElem).slider("option", "min", Math.floor(range.min))
    $(slideElem).slider("option", "max", Math.ceil(range.max))
    $(slideElem).slider("values", [Math.floor(range.min), Math.ceil(range.max)])
    $(slideElem).slider("option", "step", stepValue)

    updateFilterLabel(parentElem, "min", $(slideElem).slider("values", 0))
    updateFilterLabel(parentElem, "max", $(slideElem).slider("values", 1))

  getFilterValues = (reset)->
    if $("#filter-switch").find(".switch-animate").hasClass("switch-off")
      $slider = $(".slider-stat")
      userFilters = $slider.map (ind, item)->
        {
          name: $(item).closest(".filter-item").attr("data-statname"),
          min: $(item).slider("option", "min"),
          max: $(item).slider("option", "max")
        }
    else
      console.log "is filtering"
      $slider = $(".slider-stat")
      userFilters = $slider.map (ind, item)->
        {
          name: $(item).closest(".filter-item").attr("data-statname"),
          min: $(item).slider("values", "0"),
          max: $(item).slider("values", "1")
        }

  filterResults = (searchResults, userFilters)->
    console.log userFilters

    filtered = searchResults.filter (result, index)->
      filterTests = userFilters.map (ind, item)->
        if item.name is "grades"
          
          (+result.grades.low > item.min or +result.grades.low is item.min) && (+result.grades.high < item.max or +result.grades.high is item.max)
        else
          if _.has result, item.name
            item.min <= +result[item.name] <= item.max
          else if _.has result.zipProfile, item.name
            item.min <= +result.zipProfile[item.name] <= item.max
          else
            false

      !_.contains filterTests, false

    currentlyFiltered = filtered
    renderSearchResults(filtered)

  filterBarToggle = ()->
    $("#filter-button").attr "data-original-title", (ind, oldAttr)->
      if oldAttr is "Show Filters"
        $("#search-filters").slideDown({
          done: ()->
            $("#search-filters").css "overflow", "visible"
          })
        $(".filter-actions").fadeIn()
        return "Hide Filters"
      else
        $("#search-filters").slideUp({
          done: ()->
            $("#search-filters").css "overflow", "visible"
          })
        $(".filter-actions").fadeOut()
        return "Show Filters"


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
    if $("#filter-button").attr("data-original-title") is "Hide Filters"
      $("#filter-button").trigger("click")
    getSearch $("#search-bar").val()


  $("#search-bar").on "keypress", (e)->
    if e.keyCode is 13
      if $("#filter-button").attr("data-original-title") is "Hide Filters"
        $("#filter-button").trigger("click")
      getSearch $(this).val()

  $(document).on "click", ".result-item", ()->
    console.log "test"
    window.location.replace("/schoolProfile/"+$(this).attr("data-id"))


  $(document).on "click", "#filter-button", ()->
    $(this).toggleClass("active")
    filterBarToggle()


  $(document).on "change", "#filter-switch .switch", (e)->
    console.log $(this).find(".switch-animate").attr("class")
    filterResults(searchResults, getFilterValues())



  $(document).on "keyup", ".pager input", (e)->
    $(this).attr("size", $(this).val().length)

    total =  +$(this).parent().find(".totalPages").text()
    newPage = if 1<=parseInt($(this).val())<=total then parseInt($(this).val()) else +$("#search-results").attr("data-page")

    if (e.keyCode is 13)
      currentResults = if currentlyFiltered.length then currentlyFiltered else searchResults
      renderSearchResults currentResults, newPage
      $(this).blur()



  $(document).on "click", ".pager a", (e)->
    e.preventDefault()

    currentPage = +$("#search-results").attr("data-page")
    total =  +$(this).closest(".pager").find(".totalPages").text()
    console.log $(this).parent().hasClass("previous")

    if $(this).parent().hasClass("previous")
      if currentPage isnt 1
        console.log "render prev"
        currentResults = if currentlyFiltered.length then currentlyFiltered else searchResults
        renderSearchResults currentResults, currentPage-1

    else if $(this).parent().hasClass("next")
      if currentPage isnt total
        console.log "render next"
        currentResults = if currentlyFiltered.length then currentlyFiltered else searchResults
        renderSearchResults currentResults, currentPage+1



