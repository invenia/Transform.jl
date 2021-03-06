using DataFrames
using Dates
using Documenter
using FeatureTransforms

makedocs(;
    modules=[FeatureTransforms],
    authors="Invenia Technical Computing Corporation",
    repo="https://github.com/invenia/FeatureTransforms.jl/blob/{commit}{path}#L{line}",
    sitename="FeatureTransforms.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://invenia.github.io/FeatureTransforms.jl",
        assets=String[],
    ),
    pages=[
        "Introduction" => "index.md",
        "Guide to Transforms" => "transforms.md",
        "Transform Interface" => "transform_interface.md",
        "Examples" => "examples.md",
        "TestUtils" => "test_utils.md",
        "API" => "api.md",
    ],
    strict=true,
    checkdocs=:exports,
)

deploydocs(;
    repo="github.com/invenia/FeatureTransforms.jl",
    devbranch = "main",
    push_preview = true,
)
