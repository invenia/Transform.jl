var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/#Transforms","page":"API","title":"Transforms","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Transform\nHoD\nPower\nPeriodic\nAbstractScaling\nMeanStdScaling\nIdentityScaling\nLinearCombination\nOneHotEncoding","category":"page"},{"location":"api/#FeatureTransforms.Transform","page":"API","title":"FeatureTransforms.Transform","text":"Transform\n\nAbstract supertype for all feature Transforms.\n\n\n\n\n\n","category":"type"},{"location":"api/#FeatureTransforms.HoD","page":"API","title":"FeatureTransforms.HoD","text":"HoD <: Transform\n\nGet the hour of day corresponding to the data.\n\n\n\n\n\n","category":"type"},{"location":"api/#FeatureTransforms.Power","page":"API","title":"FeatureTransforms.Power","text":"Power(exponent) <: Transform\n\nRaise the data by the given exponent.\n\n\n\n\n\n","category":"type"},{"location":"api/#FeatureTransforms.Periodic","page":"API","title":"FeatureTransforms.Periodic","text":"Periodic{P, S}(f, period::P, [phase_shift::S]) <: Transform\n\nApplies a periodic function f with provided period and phase_shift to the data.\n\nThe period and phase_shift must have the same supertype of Real or Period, depending on whether the data is Real or TimeType respectively.\n\nnote: Note\nFor TimeType data, the result will change depending on the type of period given, even if the same amount of time is described. Example: Week(1) vs Second(Week(1)); the former starts the period on the most recent Monday, while the latter starts the period on the most recent multiple of 604800 seconds since time 0.\n\nFields\n\nf::Union{typeof(cos), typeof(sin)}: the periodic function\nperiod::Union{Real, Period}: the function period. Must be strictly positive.\nphase_shift::Union{Real, Period} (optional): adjusts the phase of the periodic function, measured in the same units as the input. Increasing the value translates the function to the right, toward higher/later input values.\n\n\n\n\n\n","category":"type"},{"location":"api/#FeatureTransforms.AbstractScaling","page":"API","title":"FeatureTransforms.AbstractScaling","text":"AbstractScaling <: Transform\n\nLinearly scale the data according to some statistics.\n\n\n\n\n\n","category":"type"},{"location":"api/#FeatureTransforms.MeanStdScaling","page":"API","title":"FeatureTransforms.MeanStdScaling","text":"MeanStdScaling(μ, σ) <: AbstractScaling\n\nLinearly scale the data by the statistical mean μ and standard deviation σ. This is also known as standardization, or the Z score transform.\n\nKeyword arguments to apply\n\ninverse=true: inverts the scaling (e.g. to reconstruct the unscaled data).\neps=1e-3: used in place of all 0 values in σ before scaling (if inverse=false).\n\n\n\n\n\n","category":"type"},{"location":"api/#FeatureTransforms.IdentityScaling","page":"API","title":"FeatureTransforms.IdentityScaling","text":"IdentityScaling <: AbstractScaling\n\nRepresents the no-op scaling which simply returns the data it is applied on.\n\n\n\n\n\n","category":"type"},{"location":"api/#FeatureTransforms.LinearCombination","page":"API","title":"FeatureTransforms.LinearCombination","text":"LinearCombination(coefficients) <: Transform\n\nCalculate the linear combination using the vector coefficients passed in.\n\n\n\n\n\n","category":"type"},{"location":"api/#FeatureTransforms.OneHotEncoding","page":"API","title":"FeatureTransforms.OneHotEncoding","text":"OneHotEncoding{R<:Real} <: Transform\n\nOne-hot encode the categorical value for each target element.\n\nConstruct a n-by-p binary matrix, given a Vector of target data x (of length n) and a Vector of all unique possible values in x (of length p).\n\nThe element [i, j] is true if the i^th target in x corresponds to the j^th possible value and false otherwise. Note that Rcan be specified to determine the return type of results. It defaults to a Matrix of Bools.\n\nNote that this Transform does not support specifying dims other than : (all dims) because it is a one-to-many transform (for example a Vector input produces a Matrix output).\n\n\n\n\n\n","category":"type"},{"location":"api/#Applying-Transforms","page":"API","title":"Applying Transforms","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"FeatureTransforms.apply\nFeatureTransforms.apply!\nFeatureTransforms.transform!\nFeatureTransforms.transform","category":"page"},{"location":"api/#FeatureTransforms.apply","page":"API","title":"FeatureTransforms.apply","text":"apply(data::T, ::Transform; kwargs...)\n\nApplies the Transform to the data. New transforms should usually only extend _apply which this method delegates to.\n\nWhere necessary, this should be extended for new data types T.\n\n\n\n\n\n","category":"function"},{"location":"api/#FeatureTransforms.apply!","page":"API","title":"FeatureTransforms.apply!","text":"apply!(data::T, ::Transform; kwargs...) -> T\n\nApplies the Transform mutating the input data. This method delegates to apply under the hood so does not need to be defined separately.\n\nIf Transform does not support mutation, this method will error.\n\n\n\n\n\n","category":"function"},{"location":"api/#FeatureTransforms.transform!","page":"API","title":"FeatureTransforms.transform!","text":"transform!(::T, data)\n\nDefines the feature engineering pipeline for some type T, which comprises a collection of Transforms to be peformed on the data.\n\ntransform! should be overloaded for custom types T that require feature engineering.\n\n\n\n\n\n","category":"function"},{"location":"api/#FeatureTransforms.transform","page":"API","title":"FeatureTransforms.transform","text":"transform(::T, data)\n\nNon-mutating version of transform!.\n\n\n\n\n\n","category":"function"},{"location":"transforms/#about-transforms","page":"Guide to Transforms","title":"Transforms","text":"","category":"section"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"A Transform defines a transformation of data for feature engineering purposes. Some examples are scaling, periodic functions, linear combination, and one-hot encoding.","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"DocTestSetup = quote\n    using DataFrames\n    using Dates\n    using FeatureTransforms\nend","category":"page"},{"location":"transforms/#Defining-a-transform","page":"Guide to Transforms","title":"Defining a transform","text":"","category":"section"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"A Transform often has one or more parameters. For example, the following defines a squaring operation (i.e. raise to the power of 2):","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"julia> p = Power(2);","category":"page"},{"location":"transforms/#Methods-to-apply-a-transform","page":"Guide to Transforms","title":"Methods to apply a transform","text":"","category":"section"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"Given some data x, there are three main methods to apply a transform. Firstly, it can be applied in a non-mutating fashion using apply:","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"julia> p = Power(2);\n\njulia> x = [1.0, 2.0, 3.0];\n\njulia> FeatureTransforms.apply(x, p)\n3-element Array{Float64,1}:\n 1.0\n 4.0\n 9.0\n\njulia> x\n3-element Array{Float64,1}:\n 1.0\n 2.0\n 3.0","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"Equivalently, the Transform object can be called directly on the data:","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"julia> p(x)\n3-element Array{Float64,1}:\n 1.0\n 4.0\n 9.0","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"Alternatively, the data can be mutated using the apply! method.","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"note: Note\nSome Transform subtypes do not support mutation, such as those which change the type or dimension of the input.","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"julia> FeatureTransforms.apply!(x, p)\n3-element Array{Float64,1}:\n 1.0\n 4.0\n 9.0\n\njulia> x\n3-element Array{Float64,1}:\n 1.0\n 4.0\n 9.0","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"A single Transform instance can be applied to different data types, with support for AbstractArrays and Tables.","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"note: Note\nSome Transform subtypes have restrictions on how they can be applied once constructed. For instance, MeanStdScaling stores the mean and standard deviation of some data, potentially specified via some dimension and column names. So MeanStdScaling should only be applied to the same data, and for the same dimension and subset of column names, as those used in construction.","category":"page"},{"location":"transforms/#Applying-to-AbstractArray","page":"Guide to Transforms","title":"Applying to AbstractArray","text":"","category":"section"},{"location":"transforms/#Default","page":"Guide to Transforms","title":"Default","text":"","category":"section"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"Without specifying optional arguments, a Transform is applied to every element of an AbstractArray and in an element-wise fashion:","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"julia> M = [2.0 4.0; 1.0 5.0; 3.0 6.0];\n\njulia> p = Power(2);\n\njulia> FeatureTransforms.apply(M, p)\n3×2 Array{Float64,2}:\n 4.0  16.0\n 1.0  25.0\n 9.0  36.0","category":"page"},{"location":"transforms/#Applying-to-specific-array-indices-with-inds","page":"Guide to Transforms","title":"Applying to specific array indices with inds","text":"","category":"section"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"Transforms can be applied to AbstractArray data with an inds keyword argument. This will apply the Transform to certain indices of an array. For example, to only square the second column:","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"julia> FeatureTransforms.apply(M, p; inds=[4, 5, 6])\n3-element Array{Float64,1}:\n 16.0\n 25.0\n 36.0","category":"page"},{"location":"transforms/#Applying-along-dimensions-using-dims","page":"Guide to Transforms","title":"Applying along dimensions using dims","text":"","category":"section"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"Transforms can be applied to AbstractArray data with a dims keyword argument. This will apply the Transform to slices of the array along this dimension, which can be selected by the inds keyword. So when dims and inds are used together, the inds change from being the global indices of the array to the relative indices of each slice.","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"For example, given a Matrix, dims=1 slices the data column-wise and inds=[2, 3] selects the 2nd and 3rd rows.","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"note: Note\nIn general, the dims argument uses the convention of mapslices, which is called behind the scenes when applying transforms to slices of data. In practice, this means that users can expect the dims keyword to behave exactly as mean(A; dims=d) would; the transformation will be applied to the elements along the dimension d and, for operations like mean or sum, reduce across this dimension.","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"julia> M\n3×2 Array{Float64,2}:\n 2.0  4.0\n 1.0  5.0\n 3.0  6.0\n\njulia> normalize_row = MeanStdScaling(M; dims=1, inds=[2])\nMeanStdScaling(3.0, 2.8284271247461903)\n\njulia> normalize_row(M; dims=1, inds=[2])\n1×2 Array{Float64,2}:\n -0.707107  0.707107\n\njulia> normalize_col = MeanStdScaling(M; dims=2, inds=[2])\nMeanStdScaling(5.0, 1.0)\n\njulia> normalize_col(M; dims=2, inds=[2])\n3×1 Array{Float64,2}:\n -1.0\n  0.0\n  1.0\n","category":"page"},{"location":"transforms/#Applying-to-Table","page":"Guide to Transforms","title":"Applying to Table","text":"","category":"section"},{"location":"transforms/#Default-2","page":"Guide to Transforms","title":"Default","text":"","category":"section"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"Without specifying optional arguments, a Transform is applied to all the data in a Table:","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"julia> nt = (a = [2.0, 1.0, 3.0], b = [4.0, 5.0, 6.0]);\n\njulia> scaling = MeanStdScaling(nt);  # compute statistics using all data\n\njulia> FeatureTransforms.apply!(nt, scaling)\n(a = [-0.8017837257372732, -1.3363062095621219, -0.2672612419124244], b = [0.2672612419124244, 0.8017837257372732, 1.3363062095621219])","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"note: Note\nThe non-mutating apply method for Table data returns a Vector of Vectors, one for each column. This is so users are free to decide what to name the results of the transformation, whether to append to the original table, etc.julia> FeatureTransforms.apply(nt, scaling)\n2-element Array{Array{Float64,1},1}:\n[-2.2994001219583993, -2.585114407672685, -2.0136858362441137]\n[-1.7279715505298279, -1.442257264815542, -1.1565429791012565]","category":"page"},{"location":"transforms/#Applying-to-specific-columns-with-cols","page":"Guide to Transforms","title":"Applying to specific columns with cols","text":"","category":"section"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"For Table data, all Transforms support a cols keyword argument in their apply methods. This applies the transform to the specified columns.","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"Using cols, we can apply different transformations to different kinds of data from the same table:","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"julia> df = DataFrame(\n           :time => DateTime(2021, 2, 27, 12):Hour(1):DateTime(2021, 2, 27, 14),\n           :temperature_A => [18.1, 19.5, 21.1],\n           :temperature_B => [16.2, 17.2, 17.5],\n       );\n\njulia> hod = HoD();\n\njulia> lc = LinearCombination([0.5, 0.5]);\n\njulia> feature_df = DataFrame(\n           :hour_of_day => hod(df; cols=:time),\n           :aggregate_temperature => lc(df; cols=[:temperature_A, :temperature_B])\n       )\n3×2 DataFrame\n Row │ hour_of_day  aggregate_temperature \n     │ Int64        Float64               \n─────┼────────────────────────────────────\n   1 │          12                  17.15\n   2 │          13                  18.35\n   3 │          14                  19.3","category":"page"},{"location":"transforms/#Transform-specific-keyword-arguments","page":"Guide to Transforms","title":"Transform-specific keyword arguments","text":"","category":"section"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"Some transforms have specific keyword arguments that can be passed to apply/apply!. For example, MeanStdScaling can invert the original scaling using the inverse argument:","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"julia> nt = (a = [2.0, 1.0, 3.0], b = [4.0, 5.0, 6.0]);\n\njulia> scaling = MeanStdScaling(nt);\n\njulia> FeatureTransforms.apply!(nt, scaling);\n\njulia> nt\n(a = [-0.8017837257372732, -1.3363062095621219, -0.2672612419124244], b = [0.2672612419124244, 0.8017837257372732, 1.3363062095621219])\n\njulia> FeatureTransforms.apply!(nt, scaling; inverse=true);\n\njulia> nt\n(a = [2.0, 1.0, 3.0], b = [4.0, 5.0, 6.0])","category":"page"},{"location":"transforms/","page":"Guide to Transforms","title":"Guide to Transforms","text":"DocTestSetup = Nothing","category":"page"},{"location":"examples/#examples","page":"Examples","title":"Examples","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"In the following example, we will imagine we are training a model to predict the temperature and humidity in a city for each hour.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"First we load some hourly weather data:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"julia> using DataFrames, Dates, FeatureTransforms\n\njulia> df = DataFrame(\n            :time => DateTime(2018, 9, 10):Hour(1):DateTime(2018, 9, 10, 23),\n            :temperature => [10.6, 9.5, 8.9, 8.9, 8.4, 8.4, 7.7, 8.9, 11.7, 13.9, 16.2, 17.7, 18.9, 20.0, 21.2, 21.7, 21.7, 21.2, 20.0, 18.4, 16.7, 15.0, 13.9, 12.7],\n            :humidity => [93.8, 96.1, 94.8, 92.4, 92.7, 97.3, 100.2, 96.2, 89.2, 83.2, 77.4, 69.7, 65.1, 59.2, 55.1, 54.9, 54.5, 56.8, 60.3, 64.8, 70.8, 77.3, 83.1, 87.0],\n        )\n24×3 DataFrame\n Row │ time                 temperature  humidity\n     │ DateTime             Float64      Float64\n─────┼────────────────────────────────────────────\n   1 │ 2018-09-10T00:00:00         10.6      93.8\n   2 │ 2018-09-10T01:00:00          9.5      96.1\n   3 │ 2018-09-10T02:00:00          8.9      94.8\n   4 │ 2018-09-10T03:00:00          8.9      92.4\n   5 │ 2018-09-10T04:00:00          8.4      92.7\n   6 │ 2018-09-10T05:00:00          8.4      97.3\n   7 │ 2018-09-10T06:00:00          7.7     100.2\n   8 │ 2018-09-10T07:00:00          8.9      96.2\n  ⋮  │          ⋮                ⋮          ⋮\n  18 │ 2018-09-10T17:00:00         21.2      56.8\n  19 │ 2018-09-10T18:00:00         20.0      60.3\n  20 │ 2018-09-10T19:00:00         18.4      64.8\n  21 │ 2018-09-10T20:00:00         16.7      70.8\n  22 │ 2018-09-10T21:00:00         15.0      77.3\n  23 │ 2018-09-10T22:00:00         13.9      83.1\n  24 │ 2018-09-10T23:00:00         12.7      87.0\n                                    9 rows omitted","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"We want to create some data features based on the time of day. One way to do this is with the Periodic transform, specifying a period of 1 day:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"julia> periodic = Periodic(sin, Day(1));\n\njulia> df.hour_of_day_sin = FeatureTransforms.apply(df, periodic; cols=:time);\n\njulia> feature_df = df\n24×4 DataFrame\n Row │ time                 temperature  humidity  hour_of_day_sin\n     │ DateTime             Float64      Float64   Float64\n─────┼─────────────────────────────────────────────────────────────\n   1 │ 2018-09-10T00:00:00         10.6      93.8         0.0\n   2 │ 2018-09-10T01:00:00          9.5      96.1         0.258819\n   3 │ 2018-09-10T02:00:00          8.9      94.8         0.5\n   4 │ 2018-09-10T03:00:00          8.9      92.4         0.707107\n   5 │ 2018-09-10T04:00:00          8.4      92.7         0.866025\n   6 │ 2018-09-10T05:00:00          8.4      97.3         0.965926\n   7 │ 2018-09-10T06:00:00          7.7     100.2         1.0\n   8 │ 2018-09-10T07:00:00          8.9      96.2         0.965926\n  ⋮  │          ⋮                ⋮          ⋮             ⋮\n  18 │ 2018-09-10T17:00:00         21.2      56.8        -0.965926\n  19 │ 2018-09-10T18:00:00         20.0      60.3        -1.0\n  20 │ 2018-09-10T19:00:00         18.4      64.8        -0.965926\n  21 │ 2018-09-10T20:00:00         16.7      70.8        -0.866025\n  22 │ 2018-09-10T21:00:00         15.0      77.3        -0.707107\n  23 │ 2018-09-10T22:00:00         13.9      83.1        -0.5\n  24 │ 2018-09-10T23:00:00         12.7      87.0        -0.258819\n                                                     9 rows omitted","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Now suppose we want to use the first 22 hours as training data and the last 2 hours as test data. Our input features are the temperature, humidity, and periodic encodings for the current hour, and the outputs to predict are the temperature and humidity for the next hour. ","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"julia> train_df = feature_df[1:end-2, :];\n\njulia> test_df = feature_df[end-1:end, :];\n\njulia> output_cols = [:temperature, :humidity];","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"For many models it is helpful to normalize the training data. We can use MeanStdScaling for that purpose. Note that we are mutating the data frame in-place using apply!, and the order of columns specified does not matter.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"julia> temp_scaling = MeanStdScaling(train_df; cols=[:temperature]);\n\njulia> hum_scaling = MeanStdScaling(train_df; cols=[:humidity]);\n\njulia> FeatureTransforms.apply!(train_df, temp_scaling; cols=[:temperature]);\n\njulia> FeatureTransforms.apply!(train_df, hum_scaling; cols=[:humidity])\n22×4 DataFrame\n Row │ time                 temperature  humidity     hour_of_day_sin\n     │ DateTime             Float64      Float64      Float64\n─────┼────────────────────────────────────────────────────────────────\n   1 │ 2018-09-10T00:00:00   -0.807635    0.98858         0.0\n   2 │ 2018-09-10T01:00:00   -1.01916     1.12684         0.258819\n   3 │ 2018-09-10T02:00:00   -1.13454     1.04869         0.5\n   4 │ 2018-09-10T03:00:00   -1.13454     0.904422        0.707107\n   5 │ 2018-09-10T04:00:00   -1.23068     0.922456        0.866025\n   6 │ 2018-09-10T05:00:00   -1.23068     1.19897         0.965926\n   7 │ 2018-09-10T06:00:00   -1.36529     1.3733          1.0\n   8 │ 2018-09-10T07:00:00   -1.13454     1.13285         0.965926\n  ⋮  │          ⋮                ⋮            ⋮              ⋮\n  16 │ 2018-09-10T15:00:00    1.32683    -1.3498         -0.707107\n  17 │ 2018-09-10T16:00:00    1.32683    -1.37385        -0.866025\n  18 │ 2018-09-10T17:00:00    1.23068    -1.23559        -0.965926\n  19 │ 2018-09-10T18:00:00    0.99993    -1.02519        -1.0\n  20 │ 2018-09-10T19:00:00    0.692259   -0.754687       -0.965926\n  21 │ 2018-09-10T20:00:00    0.365359   -0.394011       -0.866025\n  22 │ 2018-09-10T21:00:00    0.0384588  -0.00327887     -0.707107\n                                                        7 rows omitted","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"We can use the same scaling transform to normalize the test data:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"julia> FeatureTransforms.apply!(test_df, temp_scaling; cols=[:temperature]);\n\njulia> FeatureTransforms.apply!(test_df, hum_scaling; cols=[:humidity])\n2×4 DataFrame\n Row │ time                 temperature  humidity  hour_of_day_sin\n     │ DateTime             Float64      Float64   Float64\n─────┼─────────────────────────────────────────────────────────────\n   1 │ 2018-09-10T22:00:00    -0.173065  0.345374        -0.5\n   2 │ 2018-09-10T23:00:00    -0.403818  0.579814        -0.258819","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Suppose we then train our model, and get a prediction for the test points as a matrix: [-0.36 0.61; -0.45 0.68]. We can scale this back to the original units of temperature and humidity by converting to a Table type (to label the columns) and using inverse scaling:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"julia> predictions = DataFrame([-0.36 0.61; -0.45 0.68], output_cols);\n\njulia> FeatureTransforms.apply!(predictions, temp_scaling; cols=[:temperature], inverse=true);\n\njulia> FeatureTransforms.apply!(predictions, hum_scaling; cols=[:humidity], inverse=true)\n2×2 DataFrame\n Row │ temperature  humidity \n     │ Float64      Float64  \n─────┼───────────────────────\n   1 │     12.9279   87.5022\n   2 │     12.4598   88.6666","category":"page"},{"location":"#FeatureTransforms","page":"Introduction","title":"FeatureTransforms","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"FeatureTransforms.jl provides utilities for performing feature engineering in machine learning pipelines. FeatureTransforms supports operations on AbstractArrays and Tables.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"There are three key parts of the Transforms.jl API:","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"Subtypes of Transform define transformations of data, for example normalization or a periodic function.\nThe apply and apply! methods transform data according to the given Transform, in a manner determined by the data type and specified dimensions, column names, indices, and other Transform-specific parameters.\nThe transform method should be overloaded to define feature engineering pipelines that include Transforms.","category":"page"},{"location":"#Getting-Started","page":"Introduction","title":"Getting Started","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Here are some resources for getting started with FeatureTransforms.jl:","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"Refer to the page on Transforms to learn how they are defined and used.\nConsult the examples section for a quick guide to some typical use cases.","category":"page"}]
}
