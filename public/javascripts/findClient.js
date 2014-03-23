// Generated by CoffeeScript 1.7.1
(function() {
  $(function() {

    /*
    ************** Function Definitions ***********
     */
    var currentlyFiltered, filterBarToggle, filterResults, getFilterValues, getSearch, initFilterValues, initFilters, initWidgets, renderPagination, renderSearchResults, resetFilterItem, searchQuery, searchResults, updateFilterLabel;
    searchResults = [];
    searchQuery = new String;
    currentlyFiltered = searchResults;
    getSearch = function(input, url) {
      url = url ? url : "/search";
      input = input ? input : "{All}";
      searchQuery = input;
      return $.ajax({
        type: "GET",
        url: url,
        data: {
          input: input
        },
        success: function(data) {
          var elem, _i, _len, _ref;
          console.log(data);
          searchResults = data.schools;
          $("#search-filters").empty();
          $("#query-menu").empty();
          jade.render($("#query-menu")[0], "queryMenu", {
            label: "Showing Results For:",
            value: searchQuery
          });
          $("#filter-button").tooltip();
          $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();
          jade.render($("#search-filters")[0], "filterBar");
          initWidgets();
          initFilters();
          _ref = $(".slider-stat .ui-slider-segment:first-child");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elem = _ref[_i];
            $(elem).css("margin-left", "0");
          }
          $("#search-filters input").prop('disabled', true);
          return filterResults(searchResults, getFilterValues());
        }
      });
    };
    renderSearchResults = function(finalResults, pageNum) {
      var end, newPageNum, pageResults, start;
      if (finalResults.length > 10 && !pageNum) {
        renderPagination(finalResults);
        pageResults = finalResults.slice(0, 10);
      } else {
        if (pageNum) {
          end = pageNum * 10;
          start = end - 10;
          pageResults = finalResults.slice(start, end);
          $("html, body").animate({
            scrollTop: 0
          }, "slow", "swing");
        } else {
          pageResults = finalResults;
        }
      }
      $("#search-results").empty();
      jade.render($("#search-results")[0], "results", {
        schools: pageResults
      });
      newPageNum = pageNum ? pageNum : 1;
      $("#search-results").attr("data-page", newPageNum);
      return $(".pager").find("input").val($("#search-results").attr("data-page"));
    };
    renderPagination = function(finalResults) {
      var $pagination, setSize, setWidth, totalPages;
      totalPages = Math.ceil(finalResults.length / 10);
      $pagination = $("#pagination");
      $pagination.empty();
      jade.render($pagination[0], "pagination", {
        pages: totalPages
      });
      setSize = $pagination.find("input").val().length;
      setWidth = $pagination.find(".totalPages").css("width");
      $pagination.find("input").attr("size", setSize);
      return $pagination.find(".previous a").css("border-right", $pagination.find(".next a").css("border-left"));
    };
    initWidgets = function() {
      var $slider;
      $slider = $(".slider-stat");
      if ($slider.length) {
        return $slider.slider({
          animate: "fast",
          min: 0,
          max: 100,
          values: [10, 90],
          orientation: "horizontal",
          range: true,
          step: 10,
          stop: function(e, ui) {
            var filterItem;
            filterItem = $(this).closest(".filter-item");
            setTimeout(function() {
              if (filterItem.find(".ui-state-focus")) {
                filterItem.find(".ui-state-focus").trigger("blur");
              }
              return filterItem.find(".label-value").removeClass("hovered");
            }, 0);
            return filterResults(searchResults, getFilterValues());
          },
          slide: function(e, ui) {
            var filterItem, handleIndex, rangeValue;
            handleIndex = $(ui.handle).data("ui-slider-handle-index");
            rangeValue = handleIndex === 1 ? "max" : "min";
            filterItem = $(this).closest(".filter-item");
            updateFilterLabel(filterItem, rangeValue, ui.value);
            return filterItem.find(".value-" + rangeValue).addClass("hovered");
          }
        }).addSliderSegments($slider.slider("option").max);
      }
    };
    updateFilterLabel = function(filterItem, rangeValue, newValue) {
      var format, input, prettyValue;
      input = filterItem.find("input.value-" + rangeValue);
      format = filterItem.attr("data-num-format");
      if (format === "int") {
        prettyValue = newValue;
      }
      if (format === "percent") {
        prettyValue = newValue + "%";
      }
      if (format === "currency") {
        prettyValue = "$" + newValue.toString().split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1,').split('').reverse().join('');
      }
      $(input).val(prettyValue);
      return $(input).attr("size", $(input).val().length);
    };
    initFilters = function() {
      var $slider, filterAttrs, filterRanges, slideElem, _i, _len, _results;
      $slider = $(".slider-stat");
      filterAttrs = $slider.map(function(ind, item) {
        return {
          name: $(item).closest(".filter-item").attr("data-statname")
        };
      });
      filterRanges = filterAttrs.map(function(ind, filterItem) {
        return initFilterValues(filterItem);
      });
      console.log(filterRanges);
      _results = [];
      for (_i = 0, _len = $slider.length; _i < _len; _i++) {
        slideElem = $slider[_i];
        _results.push(resetFilterItem(slideElem, filterRanges));
      }
      return _results;

      /*
      {END} initFilters
       */
    };
    initFilterValues = function(filterItem) {
      var maxItem, minItem, objectLevel;
      objectLevel = 1;
      maxItem = _.max(searchResults, function(searchResult) {
        if (searchResult[filterItem.name]) {
          objectLevel = 1;
          if (filterItem.name === "grades") {
            return +searchResult[filterItem.name]["high"];
          } else {
            return +searchResult[filterItem.name];
          }
        } else if (searchResult.zipProfile[filterItem.name]) {
          objectLevel = 2;
          return +searchResult.zipProfile[filterItem.name];
        } else {
          return null;
        }
      });
      minItem = _.min(searchResults, function(searchResult) {
        if (searchResult[filterItem.name]) {
          objectLevel = 1;
          if (filterItem.name === "grades") {
            return +searchResult[filterItem.name]["low"];
          } else {
            return +searchResult[filterItem.name];
          }
        } else if (searchResult.zipProfile[filterItem.name]) {
          objectLevel = 2;
          return +searchResult.zipProfile[filterItem.name];
        } else {
          return Infinity;
        }
      });
      if (objectLevel === 1) {
        filterItem.max = isNaN(+maxItem[filterItem.name]) ? +maxItem[filterItem.name]["high"] : +maxItem[filterItem.name];
        filterItem.min = isNaN(+minItem[filterItem.name]) ? +minItem[filterItem.name]["low"] : +minItem[filterItem.name];
        return filterItem;
      } else {
        filterItem.max = +maxItem.zipProfile[filterItem.name];
        filterItem.min = +minItem.zipProfile[filterItem.name];
        return filterItem;
      }

      /*
      {END} resetFilterItem
       */
    };
    resetFilterItem = function(slideElem, filterRanges) {
      var parentElem, range, stepValue;
      range = _.where(filterRanges, {
        name: $(slideElem).closest(".filter-item").attr("data-statname")
      });
      range = range[0];
      parentElem = $(slideElem).closest(".filter-item");
      stepValue = parseFloat(parentElem.attr("data-step-value"));
      $(slideElem).slider("option", "min", Math.floor(range.min));
      $(slideElem).slider("option", "max", Math.ceil(range.max));
      $(slideElem).slider("values", [Math.floor(range.min), Math.ceil(range.max)]);
      $(slideElem).slider("option", "step", stepValue);
      updateFilterLabel(parentElem, "min", $(slideElem).slider("values", 0));
      return updateFilterLabel(parentElem, "max", $(slideElem).slider("values", 1));
    };
    getFilterValues = function(reset) {
      var $slider, userFilters;
      if ($("#filter-switch").find(".switch-animate").hasClass("switch-off")) {
        $slider = $(".slider-stat");
        return userFilters = $slider.map(function(ind, item) {
          return {
            name: $(item).closest(".filter-item").attr("data-statname"),
            min: $(item).slider("option", "min"),
            max: $(item).slider("option", "max")
          };
        });
      } else {
        console.log("is filtering");
        $slider = $(".slider-stat");
        return userFilters = $slider.map(function(ind, item) {
          return {
            name: $(item).closest(".filter-item").attr("data-statname"),
            min: $(item).slider("values", "0"),
            max: $(item).slider("values", "1")
          };
        });
      }
    };
    filterResults = function(searchResults, userFilters) {
      var filtered;
      console.log(userFilters);
      filtered = searchResults.filter(function(result, index) {
        var filterTests;
        filterTests = userFilters.map(function(ind, item) {
          var _ref, _ref1;
          if (item.name === "grades") {
            return (+result.grades.low > item.min || +result.grades.low === item.min) && (+result.grades.high < item.max || +result.grades.high === item.max);
          } else {
            if (_.has(result, item.name)) {
              return (item.min <= (_ref = +result[item.name]) && _ref <= item.max);
            } else if (_.has(result.zipProfile, item.name)) {
              return (item.min <= (_ref1 = +result.zipProfile[item.name]) && _ref1 <= item.max);
            } else {
              return false;
            }
          }
        });
        return !_.contains(filterTests, false);
      });
      currentlyFiltered = filtered;
      return renderSearchResults(filtered);
    };
    filterBarToggle = function() {
      return $("#filter-button").attr("data-original-title", function(ind, oldAttr) {
        if (oldAttr === "Show Filters") {
          $("#search-filters").slideDown({
            done: function() {
              return $("#search-filters").css("overflow", "visible");
            }
          });
          $(".filter-actions").fadeIn();
          return "Hide Filters";
        } else {
          $("#search-filters").slideUp({
            done: function() {
              return $("#search-filters").css("overflow", "visible");
            }
          });
          $(".filter-actions").fadeOut();
          return "Show Filters";
        }
      });
    };

    /*
    **************** AJAX Calls ********************
     */
    $.ajax({
      type: "GET",
      url: "/popRandomSchools",
      success: function(data) {
        return jade.render($("#search-results")[0], "results", data);
      }
    });
    $.ajax({
      type: "GET",
      url: "/popStateDropdown",
      success: function(data) {
        var newElem, obj, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          obj = data[_i];
          obj.stateAbbr.replace(" ", "");
          newElem = _.template("<li><a value='<%= stateAbbr %>'><%= stateFull %></a></li>");
          _results.push($("#browse-state .dropdown-menu").append(newElem(obj)));
        }
        return _results;
      }
    });

    /*
    **************** Event Handlers ********************
     */
    $("#search-button").on("click", function() {
      $(".dropdown-toggle").text("- BROWSE BY STATE -");
      if ($("#filter-button").attr("data-original-title") === "Hide Filters") {
        $("#filter-button").trigger("click");
      }
      return getSearch($("#search-bar").val());
    });
    $("#search-bar").on("keypress", function(e) {
      if (e.keyCode === 13) {
        $(".dropdown-toggle").text("- BROWSE BY STATE -");
        if ($("#filter-button").attr("data-original-title") === "Hide Filters") {
          $("#filter-button").trigger("click");
        }
        return getSearch($(this).val());
      }
    });
    $(document).on("click", ".dropdown-menu a", function() {
      $("#search-bar").val("");
      $(".dropdown-toggle").text($(this).text());
      return getSearch($(this).text(), "/browsestate");
    });
    $(document).on("click", ".result-item", function() {
      console.log("test");
      return window.location.replace("/schoolProfile/" + $(this).attr("data-id"));
    });
    $(document).on("click", "#filter-button", function() {
      $(this).toggleClass("active");
      return filterBarToggle();
    });
    $(document).on("change", "#filter-switch .switch", function(e) {
      console.log($(this).find(".switch-animate").attr("class"));
      return filterResults(searchResults, getFilterValues());
    });
    $(document).on("keyup", ".pager input", function(e) {
      var currentResults, newPage, total, _ref;
      $(this).attr("size", $(this).val().length);
      total = +$(this).parent().find(".totalPages").text();
      newPage = (1 <= (_ref = parseInt($(this).val())) && _ref <= total) ? parseInt($(this).val()) : +$("#search-results").attr("data-page");
      if (e.keyCode === 13) {
        currentResults = currentlyFiltered.length ? currentlyFiltered : searchResults;
        renderSearchResults(currentResults, newPage);
        return $(this).blur();
      }
    });
    return $(document).on("click", ".pager a", function(e) {
      var currentPage, currentResults, total;
      e.preventDefault();
      currentPage = +$("#search-results").attr("data-page");
      total = +$(this).closest(".pager").find(".totalPages").text();
      console.log($(this).parent().hasClass("previous"));
      if ($(this).parent().hasClass("previous")) {
        if (currentPage !== 1) {
          console.log("render prev");
          currentResults = currentlyFiltered.length ? currentlyFiltered : searchResults;
          return renderSearchResults(currentResults, currentPage - 1);
        }
      } else if ($(this).parent().hasClass("next")) {
        if (currentPage !== total) {
          console.log("render next");
          currentResults = currentlyFiltered.length ? currentlyFiltered : searchResults;
          return renderSearchResults(currentResults, currentPage + 1);
        }
      }
    });
  });

}).call(this);
